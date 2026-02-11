import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

export const prerender = false;

const convex = new ConvexHttpClient(import.meta.env.PUBLIC_CONVEX_URL);

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const { message, signature } = body;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!signature || typeof signature !== "string") {
      return new Response(JSON.stringify({ error: "Signature is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await convex.mutation(api.guestbook.add, {
      message: message.trim(),
      authorName: session.user.name ?? "Anonymous",
      githubId: (session.user as any).id ?? undefined,
      authorImage: session.user.image ?? undefined,
      signature,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Guestbook API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
