import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
