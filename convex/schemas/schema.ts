import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    userId: v.string(),
    slug: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
    template: v.union(v.literal("Default")),
    status: v.union(
      v.literal("Active"),
      v.literal("Trash"),
      v.literal("Public")
    ),
    data: v.optional(v.any()),
  }).index("by_userId", ["userId"]),
});
