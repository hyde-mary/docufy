import { mutation } from "./_generated/server";
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
