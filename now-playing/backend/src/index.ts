import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import Redis from "ioredis";

const KEY = "now-playing:latest";
const TTL_SECONDS = 600;

const token = process.env.NOW_PLAYING_TOKEN;
const websiteOrigin = process.env.WEBSITE_ORIGIN ?? "http://localhost:4321";
const corsOrigins = (
  process.env.CORS_ORIGINS ?? `${websiteOrigin},https://music.youtube.com`
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const port = Number(process.env.PORT ?? 4545);

type Source = "desktop" | "android";

type Track = {
  title: string;
  artist: string;
  album?: string;
  image?: string;
  source: Source;
  url?: string;
  playedAt: string;
};

type MemoryState = {
  track: Track | null;
  expiresAt: number;
};

const memory: MemoryState = {
  track: null,
  expiresAt: 0
};

const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      lazyConnect: true
    })
  : null;

if (redis) {
  redis.on("error", (error) => {
    console.error("Redis error:", error.message);
  });
}

async function saveTrack(track: Track) {
  if (redis) {
    try {
      if (redis.status === "wait") {
        await redis.connect();
      }

      await redis.set(KEY, JSON.stringify(track), "EX", TTL_SECONDS);
      return;
    } catch (error) {
      console.error("Redis save failed; using in-memory fallback:", error);
    }
  }

  memory.track = track;
  memory.expiresAt = Date.now() + TTL_SECONDS * 1000;
}

async function getTrack() {
  if (redis) {
    try {
      if (redis.status === "wait") {
        await redis.connect();
      }

      const value = await redis.get(KEY);
      return value ? (JSON.parse(value) as Track) : null;
    } catch (error) {
      console.error("Redis read failed; using in-memory fallback:", error);
    }
  }

  if (!memory.track || Date.now() >= memory.expiresAt) {
    memory.track = null;
    memory.expiresAt = 0;
    return null;
  }

  return memory.track;
}

function isAuthorized(authorization: string | undefined) {
  if (!token) {
    return false;
  }

  return authorization === `Bearer ${token}`;
}

const trackSchema = t.Object({
  title: t.String({ minLength: 1 }),
  artist: t.String({ minLength: 1 }),
  album: t.Optional(t.String()),
  image: t.Optional(t.String()),
  source: t.Union([t.Literal("desktop"), t.Literal("android")]),
  url: t.Optional(t.String()),
  playedAt: t.String({ format: "date-time" })
});

const app = new Elysia()
  .use(
    cors({
      origin: corsOrigins,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  )
  .get("/api/now-playing", async () => {
    return {
      track: await getTrack()
    };
  })
  .post(
    "/api/now-playing",
    async ({ body, headers, set }) => {
      if (!isAuthorized(headers.authorization)) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      console.info(
        `[now-playing] received ${body.source} track: "${body.title}" - ${body.artist}`
      );

      await saveTrack(body);
      return { ok: true };
    },
    {
      body: trackSchema
    }
  )
  .listen(port);

console.log(`Now Playing API listening on http://localhost:${app.server?.port}`);
