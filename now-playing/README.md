# Now Playing

Personal YouTube Music now-playing system with one shared backend endpoint, a Chrome extension client, an Android client, and a React UI component.

## Backend

The backend is an Elysia TypeScript app in `now-playing/backend`.

```sh
cd now-playing/backend
bun install
cp ../../.env.example .env
bun run dev
```

Required environment:

- `NOW_PLAYING_TOKEN`: bearer token required by `POST /api/now-playing`.
- `WEBSITE_ORIGIN`: allowed CORS origin, for example `https://akinkunmi.dev`.
- `CORS_ORIGINS`: comma-separated allowed browser origins. Include your website and `https://music.youtube.com` for the Chrome extension.
- `REDIS_URL`: optional Redis connection string. If omitted or Redis fails, the server falls back to in-memory storage.
- `PORT`: optional, defaults to `3001`.

Endpoints:

- `POST /api/now-playing`: validates and stores the latest track for 600 seconds.
- `GET /api/now-playing`: returns `{ "track": Track | null }`.

Redis uses the key `now-playing:latest` and sets `EX 600` on every POST.

Example POST:

```sh
curl -X POST http://localhost:3001/api/now-playing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $NOW_PLAYING_TOKEN" \
  -d '{
    "title": "Song",
    "artist": "Artist",
    "source": "desktop",
    "playedAt": "2026-05-10T12:00:00.000Z"
  }'
```

## Chrome Extension

Edit `now-playing/chrome-extension/config.js`:

```js
window.NOW_PLAYING_CONFIG = {
  API_URL: "https://music.akinkunmi.dev/api/now-playing",
  TOKEN: "same-token-as-NOW_PLAYING_TOKEN"
};
```

Load it as an unpacked extension:

1. Open `chrome://extensions`.
2. Enable Developer Mode.
3. Click "Load unpacked".
4. Select `now-playing/chrome-extension`.
5. Open `https://music.youtube.com` and play a track.

The content script watches the YouTube Music player bar with `MutationObserver`, debounces updates, and posts only when title/artist changes.

## Android App

The Android project lives in `now-playing/android`.

Edit `now-playing/android/app/build.gradle.kts` and set:

- `NOW_PLAYING_API_URL`
- `NOW_PLAYING_TOKEN`

Open the project in Android Studio, build, and install it on your phone. Launch the app and tap "Open Notification Access", then enable access for "Now Playing".

The app uses `NotificationListenerService` plus `MediaSessionManager` to read active media sessions. It filters for YouTube Music package `com.google.android.apps.youtube.music`, extracts media metadata, and posts changes to the backend.

## Website Component

The React component is at `src/components/react/NowPlaying.tsx`.

Set this in your site environment:

```sh
PUBLIC_NOW_PLAYING_API_URL=https://music.akinkunmi.dev/api/now-playing
```

Use it from an Astro page or component:

```astro
---
import NowPlaying from "../components/react/NowPlaying";
---

<NowPlaying client:load />
```

It polls every 30 seconds and displays either the latest track or "Not listening to anything right now."
