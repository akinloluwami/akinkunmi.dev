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
    <div className="mt-12 pt-8 border-t border-zinc-800">
      <p className="text-zinc-500 text-sm mb-4">React to this post</p>
      <div className="flex gap-2">
        {emojis.map((emoji) => {
          const count = getCount(emoji);
          return (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <span className="mr-1">{emoji}</span>
              {count > 0 && (
                <span className="text-zinc-500 text-sm">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Reactions;
