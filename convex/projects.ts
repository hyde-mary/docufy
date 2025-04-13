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
      template: "Default",
      status: "Active",
    });

    return projectId;
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    slug: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
    visibility: v.union(v.literal("Public"), v.literal("Private")),
    template: v.union(v.literal("Default")),
  },
  handler: async (ctx, args) => {
    const defaultData = {
      title: "",
      navLinks: [],
      theme_toggle: false,
      socials: [
        { platform: "github", href: "" },
        { platform: "facebook", href: "" },
        { platform: "twitter", href: "" },
      ],
      sections: [],
      params: {
        id: "",
        slug: "",
      },
      rootPage: {
        markdown: "",
      },
      pages: [],
    };

    const newProjectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: args.userId,
      slug: args.slug,
      iconName: args.iconName,
      description: args.description,
      template: args.template,
      status: "Active",
      data: defaultData,
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
