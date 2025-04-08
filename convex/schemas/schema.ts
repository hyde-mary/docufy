import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    userId: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.string(),
    visibility: v.string(), // Public or Private
  }).index("by_userId", ["userId"]),
});
