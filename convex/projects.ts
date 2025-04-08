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
      description:
        "Welcome to your first project! This space is designed to help you explore the features and workflow of the platform.",
    });

    return projectId;
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
    visibility: v.union(v.literal("Public"), v.literal("Private")),
    template: v.union(v.literal("Default")),
  },
  handler: async (ctx, args) => {
    const newProjectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: args.userId,
      iconName: args.iconName,
      status: "Active",
      description: args.description,
      visibility: args.visibility,
      template: args.template,
    });

    return newProjectId;
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
