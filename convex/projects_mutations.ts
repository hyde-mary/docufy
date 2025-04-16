import { v } from "convex/values";
import { mutation } from "./_generated/server";

// default data for project creation:
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

export const archiveProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.projectId, {
      status: "Inactive",
      visibility: "Private", // idk, just an extra layer of security to make it private
    });
  },
});

export const unarchiveProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.projectId, {
      status: "Active",
    });
  },
});

export const publishProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.projectId, {
      visibility: "Public",
    });
  },
});

export const unpublishProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.projectId, {
      visibility: "Private",
    });
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
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
    visibility: v.union(v.literal("Private"), v.literal("Public")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const userProjects = await ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const slugExists = userProjects.some(
      (project) => project.slug.toLowerCase() === args.slug.toLowerCase()
    );

    if (slugExists) {
      throw new Error("Duplicate Project Title and Slug");
    }

    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: userId,
      username: identity.nickname!,
      slug: args.slug,
      iconName: args.iconName,
      description: args.description,
      template: args.template,
      status: "Active",
      visibility: args.visibility,
      data: {},
    });

    const newData = {
      ...defaultData,
      params: {
        id: projectId,
        slug: args.slug,
      },
    };

    await ctx.db.patch(projectId, {
      data: newData,
    });

    return projectId;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.projectId);
  },
});

export const updateProjectTitle = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug: args.slug,
    });
  },
});

export const updateProjectIcon = mutation({
  args: {
    id: v.id("projects"),
    iconName: v.union(
      v.literal("Rocket"),
      v.literal("Book"),
      v.literal("Code"),
      v.literal("File"),
      v.literal("Presentation"),
      v.literal("None")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedProject = await ctx.db.patch(args.id, {
      iconName: args.iconName,
    });

    return updatedProject;
  },
});
