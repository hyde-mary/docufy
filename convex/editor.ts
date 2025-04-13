import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveEditorData = mutation({
  args: {
    projectId: v.id("projects"),
    editorData: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      data: args.editorData,
    });
  },
});

export const getEditorData = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.projectId);

    return data;
  },
});
