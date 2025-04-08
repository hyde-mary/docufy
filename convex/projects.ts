import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDefaultProject = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      title: "Getting Started",
      userId: args.userId,
      icon: "Rocket",
      slug: "Getting-Started",
    });

    return projectId;
  },
});

export const getProjectsByUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return projects;
  },
});

export const getProjectById = query({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    return project;
  },
});
