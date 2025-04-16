import { v } from "convex/values";
import { query } from "./_generated/server";

export const getProjectByUsernameAndSlug = query({
  args: {
    username: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_username_slug_visibility", (q) =>
        q
          .eq("username", args.username)
          .eq("slug", args.slug)
          .eq("visibility", "Public")
      )
      .first();

    return project;
  },
});
