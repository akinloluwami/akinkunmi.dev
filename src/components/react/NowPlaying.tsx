import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Track = {
  title: string;
  artist: string;
  album?: string;
  image?: string;
  source: "desktop" | "android";
  url?: string;
  playedAt: string;
};

type ApiResponse = {
  track: Track | null;
};

type NowPlayingProps = {
  apiUrl?: string;
};

const defaultApiUrl =
  import.meta.env.PUBLIC_NOW_PLAYING_API_URL ?? "/api/now-playing";

export default function NowPlaying({ apiUrl = defaultApiUrl }: NowPlayingProps) {
  const [track, setTrack] = useState<Track | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchTrack() {
      try {
        const response = await fetch(apiUrl);
        const data = (await response.json()) as ApiResponse;

        if (!cancelled) {
          setTrack(data.track ?? null);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setTrack(null);
          setLoaded(true);
        }
      }
    }

    fetchTrack();
    const interval = window.setInterval(fetchTrack, 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [apiUrl]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!loaded || !track) {
    return (
      <section className="flex items-center gap-3 rounded-md border border-hairline bg-white/5 p-4 text-sm text-muted">
        <span>Not listening to anything right now.</span>
      </section>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        layoutId="now-playing-card"
        onClick={() => setIsOpen(true)}
        className="group flex w-full items-center gap-4 rounded-md border border-hairline bg-white/5 p-4 text-left transition-colors hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <AlbumCover image={track.image} size="small" />

        <div className="min-w-0">
          <motion.p
            layoutId="now-playing-kicker"
            className="truncate text-sm text-muted"
          >
            I&apos;m currently listening to
          </motion.p>
          <motion.p
            layoutId="now-playing-title"
            className="truncate text-base font-medium text-off-white"
          >
            {track.title} <span className="text-muted">-</span> {track.artist}
          </motion.p>
          <motion.p
            layoutId="now-playing-source"
            className="mt-1 text-xs capitalize text-muted-faint"
          >
            {track.source}
          </motion.p>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close now playing"
              className="absolute inset-0 bg-black-001/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              layoutId="now-playing-card"
              role="dialog"
              aria-modal="true"
              aria-label={`Now playing: ${track.title} by ${track.artist}`}
              className="relative w-full max-w-sm overflow-hidden rounded-md border border-hairline bg-black-001 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              {track.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl saturate-150"
                  style={{ backgroundImage: `url(${track.image})` }}
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/35 text-lg leading-none text-muted transition-colors hover:text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="Close"
              >
                x
              </button>

              <div className="relative">
                <AlbumCover image={track.image} size="large" />

                <div className="mt-5 min-w-0">
                  <motion.p
                    layoutId="now-playing-kicker"
                    className="text-sm text-muted"
                  >
                    I&apos;m currently listening to
                  </motion.p>
                  <motion.h2
                    layoutId="now-playing-title"
                    className="mt-2 text-2xl font-medium leading-tight text-off-white"
                  >
                    {track.title}
                  </motion.h2>
                  <p className="mt-1 text-base text-muted">{track.artist}</p>
                  {track.album ? (
                    <p className="mt-3 text-sm text-muted-faint">{track.album}</p>
                  ) : null}
                  <motion.p
                    layoutId="now-playing-source"
                    className="mt-5 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-muted"
                  >
                    {track.source}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function AlbumCover({
  image,
  size
}: {
  image?: string;
  size: "small" | "large";
}) {
  if (!image) return null;

  const dimensions = size === "large" ? "h-72 w-full" : "h-14 w-14";

  return (
    <motion.div
      layoutId="now-playing-cover-wrap"
      className={`relative shrink-0 ${dimensions}`}
    >
      <div
        className="absolute inset-0 rounded-md bg-cover bg-center opacity-45 blur-xl saturate-150 transition-opacity duration-500 group-hover:opacity-75"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-[-1px] rounded-md bg-gradient-to-br from-white/25 via-white/5 to-black/30 opacity-80" />
      <motion.img
        layoutId="now-playing-cover"
        src={image}
        alt=""
        className="relative h-full w-full rounded-md border border-white/10 object-cover shadow-[0_12px_30px_rgba(0,0,0,0.32)] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </motion.div>
  );
}
