import { query } from "./_generated/server";

export const getActiveProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // identity.subject is where the user id is stored.
    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Active"),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();

    return projects;
  },
});

export const getInactiveProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Inactive"),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();

    return projects;
  },
});
