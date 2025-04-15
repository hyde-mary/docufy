import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

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
