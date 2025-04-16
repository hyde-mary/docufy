import { v } from "convex/values";
import { query } from "./_generated/server";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // identity.subject is where the user id is stored.
    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.and(q.eq(q.field("userId"), userId)))
      .collect();

    return projects;
  },
});

export const getActiveProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // identity.subject is where the user id is stored.
    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Active"),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();

    return projects;
  },
});

export const getInactiveProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Inactive"),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();

    return projects;
  },
});

export const getPublishedProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("visibility"), "Public"),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();

    return projects;
  },
});

export const getProjectById = query({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const project = await ctx.db.get(args.id);

    // if for some reason they don't own it
    if (project?.userId !== userId) return;

    return project;
  },
});
