import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createDefaultProject = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      title: "Getting Started",
      userId: args.userId,
    });

    return projectId;
  },
});
