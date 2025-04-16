import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveEditorData = mutation({
  args: {
    projectId: v.id("projects"),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project does not exist");
    }

    if (project.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.projectId, {
      data: args.data,
    });
  },
});
