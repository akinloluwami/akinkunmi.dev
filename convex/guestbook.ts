import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db
      .query("guestbook")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
    return entries;
  },
});

export const add = mutation({
  args: {
    message: v.string(),
    authorName: v.string(),
    githubId: v.optional(v.string()),
    githubUsername: v.optional(v.string()),
    authorImage: v.optional(v.string()),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.githubId) {
      const existing = await ctx.db
        .query("guestbook")
        .withIndex("by_github_id", (q) => q.eq("githubId", args.githubId))
        .first();

      if (existing) {
        throw new Error("You have already signed the guestbook.");
      }
    }

    await ctx.db.insert("guestbook", {
      message: args.message,
      authorName: args.authorName,
      githubId: args.githubId,
      githubUsername: args.githubUsername,
      authorImage: args.authorImage,
      signature: args.signature,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});
