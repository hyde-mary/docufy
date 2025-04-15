import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

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

export const createDefaultProject = internalMutation({
  args: {
    userId: v.string(),
    username: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      userId: args.userId,
      username: args.username,
      title: "Getting Started",
      iconName: "Rocket",
      slug: "getting-started",
      description:
        "Welcome to your first project! This space is designed to help you explore the features and workflow of the platform.",
      template: "Default",
      status: "Active",
      visibility: "Private",
      data: {},
    });

    const processedData = processTemplateData(
      args.data,
      projectId,
      "getting-started"
    );

    await ctx.db.patch(projectId, {
      data: processedData,
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
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const newProjectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: args.userId,
      slug: args.slug,
      iconName: args.iconName,
      username: identity.nickname!,
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

export const getProjectByUsernameAndSlug = query({
  args: {
    username: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("username"), args.username),
          q.eq(q.field("slug"), args.slug),
          q.eq(q.field("status"), "Public")
        )
      )
      .first();

    return project;
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

export const getUserPublishProjects = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "Public"),
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

export const publishProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      status: "Public",
      visibility: "Public",
    });
  },
});

export const unpublishProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      status: "Active",
      visibility: "Private",
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
      ...project?.data,
      params: {
        ...project?.data.params,
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

// helper functions:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processTemplateData(data: any, id: string, slug: string) {
  const basePath = `/editor/${id}/${slug}`;

  const newData = JSON.parse(JSON.stringify(data));

  newData.params = {
    id,
    slug,
  };

  if (newData.navLinks) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData.navLinks = newData.navLinks.map((link: any) => ({
      ...link,
      href: `${basePath}${link.path}`,
    }));
  }

  if (newData.pages) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData.pages = newData.pages.map((page: any) => ({
      ...page,
      href: `${basePath}${page.path}`,
    }));
  }

  if (newData.sections) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData.sections = newData.sections.map((section: any) => {
      if (section.type === "link") {
        return {
          ...section,
          href: `${basePath}${section.path}`,
        };
      }
      if (section.type === "dropdown" && section.items) {
        return {
          ...section,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items: section.items.map((item: any) => ({
            ...item,
            href: `${basePath}${item.path}`,
          })),
        };
      }
      return section;
    });
  }

  return newData;
}
