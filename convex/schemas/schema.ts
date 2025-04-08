import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    userId: v.string(),
    slug: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(v.literal("Active"), v.literal("Paused")),
    visibility: v.union(v.literal("Public"), v.literal("Private")),
    template: v.union(v.literal("Default")),
  }).index("by_userId", ["userId"]),
});
