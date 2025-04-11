import { useEditorStore } from "@/stores/editor-store";

export function useAllEditorHrefs() {
  const sections = useEditorStore((state) => state.data.sections);
  const navLinks = useEditorStore((state) => state.data.navLinks);
  const params = useEditorStore((state) => state.data.params);

  const baseHref = `/editor/${params.id}/${params.slug}/`;

  const sectionHrefs = sections.flatMap((section) => {
    if (section.type === "link" && section.path) {
      const cleanedPath = section.path.replace(/^\/+/, "");
      return [
        {
          path: cleanedPath,
          href: `${baseHref}${cleanedPath}`,
        },
      ];
    }

    if (section.type === "dropdown") {
      return section.items
        .filter((item) => item.path)
        .map((item) => {
          const cleanedPath = item.path.replace(/^\/+/, "");
          return {
            path: cleanedPath,
            href: `${baseHref}${cleanedPath}`,
          };
        });
    }

    return [];
  });

  const navLinkHrefs = navLinks
    .filter((link) => link.path)
    .map((link) => {
      const cleanedPath = link.path.replace(/^\/+/, "");
      return {
        path: cleanedPath,
        href: `${baseHref}${cleanedPath}`,
      };
    });

  const rootPath = {
    path: params.slug,
    href: baseHref,
  };

  return [rootPath, ...navLinkHrefs, ...sectionHrefs];
}
