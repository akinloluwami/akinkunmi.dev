import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const reactions = await ctx.db
      .query("reactions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    const counts: Array<{ emoji: string; count: number }> = [];
    const emojiMap = new Map<string, number>();

    for (const reaction of reactions) {
      emojiMap.set(reaction.emoji, (emojiMap.get(reaction.emoji) || 0) + 1);
    }

    for (const [emoji, count] of emojiMap) {
      counts.push({ emoji, count });
    }

    return counts;
  },
});

export const add = mutation({
  args: { slug: v.string(), emoji: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("reactions", {
      slug: args.slug,
      emoji: args.emoji,
    });
    return { success: true };
  },
});
