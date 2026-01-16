import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reactions: defineTable({
    slug: v.string(),
    emoji: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_slug_emoji", ["slug", "emoji"]),
});
