import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reactions: defineTable({
    slug: v.string(),
    emoji: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_slug_emoji", ["slug", "emoji"]),

  guestbook: defineTable({
    message: v.string(),
    authorName: v.string(),
    githubUsername: v.optional(v.string()),
    githubId: v.optional(v.string()),
    authorImage: v.optional(v.string()),
    signature: v.string(),
    createdAt: v.number(),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_github_id", ["githubId"]),
});
