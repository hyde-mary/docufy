import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    userId: v.string(),
    iconName: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});
