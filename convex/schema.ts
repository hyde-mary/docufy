import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // users table
  users: defineTable({
    name: v.string(),
    username: v.string(),
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),

  projects: defineTable({
    title: v.string(),

    userId: v.string(), // external id

    username: v.string(),

    slug: v.string(),

    iconName: v.union(
      v.literal("Rocket"),
      v.literal("Book"),
      v.literal("Code"),
      v.literal("File"),
      v.literal("Presentation"),
      v.literal("None")
    ),

    description: v.optional(v.string()),

    template: v.union(v.literal("Default")),

    status: v.union(v.literal("Active"), v.literal("Inactive")), // let us define it like this.

    visibility: v.union(v.literal("Private"), v.literal("Public")),

    data: v.optional(v.any()),
  })
    .index("by_userId", ["userId"])
    .index("by_username_slug_visibility", ["username", "slug", "visibility"]),
});
