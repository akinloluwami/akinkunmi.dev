import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ReactionsProps {
  slug: string;
}

const emojis = ["👍", "❤️", "🔥", "🚀", "👀"];

const Reactions = ({ slug }: ReactionsProps) => {
  const reactionsData = useQuery(api.reactions.get, { slug }) || [];
  const addReaction = useMutation(api.reactions.add);

  const getCount = (emoji: string) => {
    const found = reactionsData.find((r) => r.emoji === emoji);
    return found?.count || 0;
  };

  const handleReaction = async (emoji: string) => {
    await addReaction({ slug, emoji });
  };

  return (
    <div className="mt-14 pt-10 border-t border-hairline">
      <p className="text-2xs uppercase tracking-[0.14em] text-muted-faint mb-5">
        Reactions
      </p>
      <div className="flex flex-wrap gap-2">
        {emojis.map((emoji) => {
          const count = getCount(emoji);
          return (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="px-3 py-1.5 rounded-md border border-hairline bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            >
              <span className="mr-1">{emoji}</span>
              {count > 0 && (
                <span className="text-muted text-sm tabular-nums">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Reactions;
