import { StateCreator } from "zustand";
import { NavLink } from "@/types/project-data";
import { BaseSlice } from "./base-slice";

export interface NavLinksSlice {
  addNavLink: () => void;
  updateNavLink: (index: number, newLink: NavLink) => void;
  removeNavLink: (index: number) => void;
}

export const createNavLinksSlice: StateCreator<
  BaseSlice & NavLinksSlice,
  [],
  [],
  NavLinksSlice
> = (set) => ({
  addNavLink: () =>
    set((state) => {
      if (state.data.navLinks.length >= 7) return state;

      const newNavLink: NavLink = { name: "", path: "", href: "" };

      return {
        data: {
          ...state.data,
          navLinks: [...state.data.navLinks, newNavLink],
        },
      };
    }),
  updateNavLink: (index, newLink) =>
    set((state) => {
      const { id, slug } = state.data.params;
      const computedHref = `/editor/${id}/${slug}/${newLink.path.replace(/^\/+/, "")}`;

      const originalLink = state.data.navLinks[index];
      const originalHref = originalLink?.href || "";
      const originalPath = originalLink?.path || "";

      const updatedNavLinks = [...state.data.navLinks];
      updatedNavLinks[index] = {
        ...newLink,
        href: computedHref,
      };

      const updatedPages = [...state.data.pages];

      const pathHasChanged = originalPath !== newLink.path;

      const originalPageIndex = updatedPages.findIndex(
        (page) => page.href === originalHref
      );
      const newPageIndex = updatedPages.findIndex(
        (page) => page.href === computedHref
      );

      const otherNavLinksWithOriginalHref = state.data.navLinks.some(
        (link, i) => i !== index && link.href === originalHref
      );

      const anySectionWithOriginalHref = state.data.sections.some(
        (section) =>
          (section.type === "link" && section.href === originalHref) ||
          (section.type === "dropdown" &&
            section.items.some((item) => item.href === originalHref))
      );

      const otherElementsUsingOriginalHref =
        otherNavLinksWithOriginalHref || anySectionWithOriginalHref;

      if (pathHasChanged && newLink.path.trim() !== "") {
        if (newPageIndex === -1) {
          if (originalPageIndex !== -1) {
            if (!otherElementsUsingOriginalHref) {
              updatedPages[originalPageIndex] = {
                ...updatedPages[originalPageIndex],
                name: newLink.name,
                path: newLink.path,
                href: computedHref,
                markdown: updatedPages[originalPageIndex].markdown || "",
              };
            } else {
              updatedPages.push({
                name: newLink.name,
                path: newLink.path,
                href: computedHref,
                markdown: "",
              });
            }
          } else {
            updatedPages.push({
              name: newLink.name,
              path: newLink.path,
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
          name: newLink.name,
        };
      }

      return {
        data: {
          ...state.data,
          navLinks: updatedNavLinks,
          pages: updatedPages,
        },
      };
    }),
  removeNavLink: (index) =>
    set((state) => {
      const navLinkToRemove = state.data.navLinks[index];
      const filteredNavLinks = state.data.navLinks.filter(
        (_, i) => i !== index
      );

      const href = navLinkToRemove?.href;

      const otherNavLinksUsingHref = filteredNavLinks.some(
        (link) => link.href === href
      );

      const anySectionUsingHref = state.data.sections.some(
        (section) =>
          (section.type === "link" && section.href === href) ||
          (section.type === "dropdown" &&
            section.items.some((item) => item.href === href))
      );

      let updatedPages = [...state.data.pages];
      if (!otherNavLinksUsingHref && !anySectionUsingHref && href) {
        updatedPages = updatedPages.filter((page) => page.href !== href);
      }

      return {
        data: {
          ...state.data,
          navLinks: filteredNavLinks,
          pages: updatedPages,
        },
      };
    }),
});
