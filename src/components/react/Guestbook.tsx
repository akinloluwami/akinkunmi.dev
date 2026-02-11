import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignaturePad } from "./signature-pad";
import { signIn, signOut } from "auth-astro/client";
import { LogIn, LogOut, Pen } from "lucide-react";

interface Session {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export default function Guestbook() {
  const entries = useQuery(api.guestbook.list);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const hasSigned =
    session?.user?.id && entries
      ? entries.some(
          (entry) => "githubId" in entry && entry.githubId === session.user!.id,
        )
      : false;

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data && data.user ? data : null);
        setSessionLoading(false);
      })
      .catch(() => setSessionLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!message.trim() || !signature) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), signature }),
      });

      if (res.ok) {
        setShowModal(false);
        setMessage("");
        setSignature(null);
      } else {
        const data = await res.json();
        console.error("Guestbook error:", res.status, data);
      }
    } catch (err) {
      console.error("Failed to sign guestbook:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Guestbook</h1>
          {sessionLoading ? null : session?.user ? (
            hasSigned ? (
              <span className="text-zinc-500 text-sm">You've signed!</span>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors"
              >
                <Pen size={14} />
                Sign guestbook
              </button>
            )
          ) : (
            <button
              onClick={() => signIn("github")}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors"
            >
              <LogIn size={14} />
              Sign in with GitHub
            </button>
          )}
        </div>
        {session?.user && (
          <div className="flex items-center gap-2 mt-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="w-5 h-5 rounded-full"
              />
            )}
            <span className="text-zinc-500 text-xs">
              Signed in as {session.user.name}
            </span>
            <span className="text-zinc-700 text-xs">·</span>
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries === undefined ? (
          <div className="col-span-full text-zinc-500 text-sm">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="col-span-full text-zinc-500 text-sm">
            No entries yet. Be the first to sign!
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 flex flex-col justify-between min-h-[140px]"
            >
              <p className="text-white text-sm leading-relaxed mb-4">
                {entry.message}
              </p>
              {entry.signature && (
                <img
                  src={entry.signature}
                  alt={`${entry.authorName}'s signature`}
                  className="w-full h-auto opacity-80 mt-2"
                />
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm">
                      {entry.authorName}
                    </p>
                    <p className="text-zinc-500 text-xs">
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#0a0a0a] border border-zinc-800/60 rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-lg font-bold text-white mb-4">
              Sign my guestbook
            </h2>

            <label className="block text-sm text-zinc-300 mb-2">
              Leave a message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something nice..."
              rows={3}
              className="w-full bg-transparent border border-zinc-800 rounded-lg p-3 text-white text-sm placeholder-zinc-500 min-h-40 resize-y focus:outline-none focus:border-zinc-600 mb-4"
            />

            <label className="block text-sm text-zinc-300 mb-2">
              Sign Here
            </label>
            <SignaturePad
              className="h-[150px] w-full rounded-lg border border-zinc-800 mb-4"
              onChange={setSignature}
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !message.trim() || !signature}
                className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Signing..." : "Sign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
