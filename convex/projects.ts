import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const createDefaultProject = mutation({
  args: {
    userId: v.string(),
    data: v.any(), // set to any so we don't need to define the object data as this might change
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      title: "Getting Started",
      userId: args.userId,
      iconName: "Rocket",
      slug: "Getting-Started",
      description:
        "Welcome to your first project! This space is designed to help you explore the features and workflow of the platform.",
      template: "Default",
      status: "Active",
      visibility: "Private",
      data: args.data,
    });

    const newData = {
      ...args.data,
      params: {
        id: projectId,
        slug: "Getting-Started",
      },
    };

    await ctx.db.patch(projectId, {
      data: newData,
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
    const newProjectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: args.userId,
      slug: args.slug,
      iconName: args.iconName,
      description: args.description,
      template: args.template,
      status: "Active",
      visibility: "Private",
      data: {},
    });

    const newData = {
      ...defaultData,
      params: {
        id: newProjectId,
        slug: args.slug,
      },
    };

    await ctx.db.patch(newProjectId, {
      data: newData,
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

export const getUserActiveProjects = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Active"),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .collect();

    return projects;
  },
});

export const getUserTrashProjects = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Trash"),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .collect();

    return projects;
  },
});

export const moveProjectToTrash = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      status: "Trash",
    });
  },
});

export const restoreProjectFromTrash = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      status: "Active",
    });
  },
});

// total deletion from the database
export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});

export const editProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    slug: v.string(),
    iconName: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    const updatedData = {
      ...project.data,
      params: {
        ...project.data.params,
        slug: args.slug,
      },
    };

    await ctx.db.patch(args.projectId, {
      title: args.title,
      slug: args.slug,
      iconName: args.iconName,
      description: args.description,
      data: updatedData,
    });
  },
});
