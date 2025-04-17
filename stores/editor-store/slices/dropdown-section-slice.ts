import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";
import { DropdownSection, LinkSection } from "@/types/project-data";

export interface DropdownSectionSlice {
  addDropdownSection: () => void;
  updateDropdownSection: (index: number, updated: DropdownSection) => void;
  removeDropdownSection: (index: number) => void;
  addItemToDropdown: (index: number) => void;
  updateItemInDropdown: (
    sectionIndex: number,
    itemIndex: number,
    updatedItem: LinkSection
  ) => void;
  removeItemFromDropdown: (sectionIndex: number, itemIndex: number) => void;
}

export const createDropdownSectionSlice: StateCreator<
  BaseSlice & DropdownSectionSlice,
  [],
  [],
  DropdownSectionSlice
> = (set) => ({
  addDropdownSection: () =>
    set((state) => {
      const newSection: DropdownSection = {
        type: "dropdown",
        name: "",
        items: [],
      };
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, newSection],
        },
      };
    }),
  updateDropdownSection: (index, updated) =>
    set((state) => {
      const updatedSections = [...state.data.sections];
      updatedSections[index] = updated;
      return {
        data: {
          ...state.data,
          sections: updatedSections,
        },
      };
    }),
  removeDropdownSection: (index) =>
    set((state) => {
      const section = state.data.sections[index];

      if (!section || section.type !== "dropdown") {
        return {
          data: {
            ...state.data,
            sections: state.data.sections.filter((_, i) => i !== index),
          },
        };
      }

      const itemHrefs =
        section.type === "dropdown"
          ? section.items.map((item) => item.href)
          : [];

      const filteredSections = state.data.sections.filter(
        (_, i) => i !== index
      );

      let updatedPages = [...state.data.pages];

      itemHrefs.forEach((href) => {
        if (!href) return; // Skip empty hrefs

        const otherSectionsUsingHref = filteredSections.some(
          (section) =>
            (section.type === "link" && section.href === href) ||
            (section.type === "dropdown" &&
              section.items.some((item) => item.href === href))
        );

        const anyNavLinkUsingHref = state.data.navLinks.some(
          (link) => link.href === href
        );

        if (!otherSectionsUsingHref && !anyNavLinkUsingHref) {
          updatedPages = updatedPages.filter((page) => page.href !== href);
        }
      });

      return {
        data: {
          ...state.data,
          sections: filteredSections,
          pages: updatedPages,
        },
      };
    }),
  addItemToDropdown: (index: number) =>
    set((state) => {
      const section = state.data.sections[index];
      if (!section || section.type !== "dropdown") return state;

      const updatedDropdown: DropdownSection = {
        ...section,
        items: [
          ...section.items,
          { name: "", href: "", path: "", type: "link" },
        ],
      };

      const updatedSections = [...state.data.sections];
      updatedSections[index] = updatedDropdown;

      return {
        data: {
          ...state.data,
          sections: updatedSections,
        },
      };
    }),
  updateItemInDropdown: (
    sectionIndex: number,
    itemIndex: number,
    updatedItem: LinkSection
  ) =>
    set((state) => {
      const section = state.data.sections[sectionIndex];
      if (!section || section.type !== "dropdown") return state;

      const { id, slug } = state.data.params;
      const computedHref = `/editor/${id}/${slug}/${updatedItem.path.replace(/^\/+/, "")}`;

      const originalItem = section.items[itemIndex];
      const originalHref = originalItem?.href || "";
      const originalPath = originalItem?.path || "";

      const updatedItemWithHref = {
        ...updatedItem,
        href: computedHref,
      };

      const updatedItems = [...section.items];
      updatedItems[itemIndex] = updatedItemWithHref;

      const updatedDropdown: DropdownSection = {
        ...section,
        items: updatedItems,
      };

      const updatedSections = [...state.data.sections];
      updatedSections[sectionIndex] = updatedDropdown;

      const updatedPages = [...state.data.pages];

      const pathHasChanged = originalPath !== updatedItem.path;

      const originalPageIndex = updatedPages.findIndex(
        (page) => page.href === originalHref
      );
      const newPageIndex = updatedPages.findIndex(
        (page) => page.href === computedHref
      );

      const otherDropdownItemsWithOriginalHref = state.data.sections.some(
        (s) => {
          if (s.type !== "dropdown") return false;

          return s.items.some(
            (item, i) =>
              !(s === section && i === itemIndex) && item.href === originalHref
          );
        }
      );

      const linkSectionsWithOriginalHref = state.data.sections.some(
        (s) => s.type === "link" && s.href === originalHref
      );

      const navLinksWithOriginalHref = state.data.navLinks.some(
        (link) => link.href === originalHref
      );

      const otherElementsUsingOriginalHref =
        otherDropdownItemsWithOriginalHref ||
        linkSectionsWithOriginalHref ||
        navLinksWithOriginalHref;

      if (pathHasChanged && updatedItem.path.trim() !== "") {
        if (newPageIndex === -1) {
          if (originalPageIndex !== -1) {
            if (!otherElementsUsingOriginalHref) {
              updatedPages[originalPageIndex] = {
                ...updatedPages[originalPageIndex],
                name: updatedItem.name,
                path: updatedItem.path,
                href: computedHref,
                markdown: updatedPages[originalPageIndex].markdown || "",
              };
            } else {
              updatedPages.push({
                name: updatedItem.name,
                path: updatedItem.path,
                href: computedHref,
                markdown: "",
              });
            }
          } else {
            updatedPages.push({
              name: updatedItem.name,
              path: updatedItem.path,
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
          name: updatedItem.name,
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
  removeItemFromDropdown: (sectionIndex: number, itemIndex: number) =>
    set((state) => {
      const section = state.data.sections[sectionIndex];
      if (!section || section.type !== "dropdown") return state;

      const itemToRemove = section.items[itemIndex];
      const href = itemToRemove?.href;

      const updatedItems = section.items.filter((_, i) => i !== itemIndex);

      const updatedDropdown: DropdownSection = {
        ...section,
        items: updatedItems,
      };

      const updatedSections = [...state.data.sections];
      updatedSections[sectionIndex] = updatedDropdown;

      const otherDropdownItemsUsingHref = state.data.sections.some((s) => {
        if (s.type !== "dropdown") return false;

        if (s === section) {
          return updatedItems.some((item) => item.href === href);
        } else {
          return s.items.some((item) => item.href === href);
        }
      });

      const anyLinkSectionUsingHref = state.data.sections.some(
        (s) => s.type === "link" && s.href === href
      );

      const anyNavLinkUsingHref = state.data.navLinks.some(
        (link) => link.href === href
      );

      let updatedPages = [...state.data.pages];
      if (
        !otherDropdownItemsUsingHref &&
        !anyLinkSectionUsingHref &&
        !anyNavLinkUsingHref &&
        href
      ) {
        updatedPages = updatedPages.filter((page) => page.href !== href);
      }

      return {
        data: {
          ...state.data,
          sections: updatedSections,
          pages: updatedPages,
        },
      };
    }),
});
