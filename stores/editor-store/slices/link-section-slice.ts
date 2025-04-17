import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";
import { LinkSection } from "@/types/project-data";

export interface LinkSectionSlice {
  addLinkSection: () => void;
  updateLinkSection: (index: number, updated: LinkSection) => void;
  removeLinkSection: (index: number) => void;
}

export const createLinkSectionSlice: StateCreator<
  BaseSlice & LinkSectionSlice,
  [],
  [],
  LinkSectionSlice
> = (set) => ({
  addLinkSection: () =>
    set((state) => {
      const newSection: LinkSection = {
        type: "link",
        name: "",
        path: "",
        href: "",
      };
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, newSection],
        },
      };
    }),
  updateLinkSection: (index, updated) =>
    set((state) => {
      const { id, slug } = state.data.params;
      const computedHref = `/editor/${id}/${slug}/${updated.path.replace(/^\/+/, "")}`;

      const originalSection = state.data.sections[index];
      const originalHref =
        originalSection?.type === "link" ? originalSection.href : "";
      const originalPath =
        originalSection?.type === "link" ? originalSection.path : "";

      const updatedSections = [...state.data.sections];
      updatedSections[index] = {
        ...updated,
        href: computedHref,
      };

      const updatedPages = [...state.data.pages];

      const pathHasChanged = originalPath !== updated.path;

      const originalPageIndex = updatedPages.findIndex(
        (page) => page.href === originalHref
      );
      const newPageIndex = updatedPages.findIndex(
        (page) => page.href === computedHref
      );

      const otherSectionsWithOriginalHref = state.data.sections.some(
        (section, i) =>
          i !== index &&
          ((section.type === "link" && section.href === originalHref) ||
            (section.type === "dropdown" &&
              section.items.some((item) => item.href === originalHref)))
      );

      const navLinksWithOriginalHref = state.data.navLinks.some(
        (link) => link.href === originalHref
      );

      const otherElementsUsingOriginalHref =
        otherSectionsWithOriginalHref || navLinksWithOriginalHref;

      if (pathHasChanged && updated.path.trim() !== "") {
        if (newPageIndex === -1) {
          if (originalPageIndex !== -1) {
            if (!otherElementsUsingOriginalHref) {
              updatedPages[originalPageIndex] = {
                ...updatedPages[originalPageIndex],
                name: updated.name,
                path: updated.path,
                href: computedHref,
                markdown: updatedPages[originalPageIndex].markdown || "",
              };
            } else {
              updatedPages.push({
                name: updated.name,
                path: updated.path,
                href: computedHref,
                markdown: "",
              });
            }
          } else {
            updatedPages.push({
              name: updated.name,
              path: updated.path,
              href: computedHref,
              markdown: "",
            });
          }
        } else if (
          originalPageIndex !== -1 &&
          !otherElementsUsingOriginalHref
        ) {
          updatedPages.splice(originalPageIndex, 1);
        }
      } else if (originalPageIndex !== -1) {
        updatedPages[originalPageIndex] = {
          ...updatedPages[originalPageIndex],
          name: updated.name,
        };
      }

      return {
        data: {
          ...state.data,
          sections: updatedSections,
          pages: updatedPages,
        },
      };
    }),
  removeLinkSection: (index) =>
    set((state) => {
      const sectionToRemove = state.data.sections[index];
      if (!sectionToRemove || sectionToRemove.type !== "link") {
        return {
          data: {
            ...state.data,
            sections: state.data.sections.filter((_, i) => i !== index),
          },
        };
      }

      const href = sectionToRemove.href;
      const filteredSections = state.data.sections.filter(
        (_, i) => i !== index
      );

      const otherSectionsUsingHref = filteredSections.some(
        (section) =>
          (section.type === "link" && section.href === href) ||
          (section.type === "dropdown" &&
            section.items.some((item) => item.href === href))
      );

      const anyNavLinkUsingHref = state.data.navLinks.some(
        (link) => link.href === href
      );

      let updatedPages = [...state.data.pages];
      if (!otherSectionsUsingHref && !anyNavLinkUsingHref && href) {
        updatedPages = updatedPages.filter((page) => page.href !== href);
      }

      return {
        data: {
          ...state.data,
          sections: filteredSections,
          pages: updatedPages,
        },
      };
    }),
});
