import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: args.userId,
    });

    return projectId;
  },
});
