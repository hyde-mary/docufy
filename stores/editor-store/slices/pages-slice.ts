import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";

export interface PagesSlice {
  // root page methods
  updateRootPageMarkdown: (markdown: string) => void;

  // page methods
  updatePageMarkdown: (href: string, markdown: string) => void;
}

export const createPagesSlice: StateCreator<
  BaseSlice & PagesSlice,
  [],
  [],
  PagesSlice
> = (set) => ({
  updateRootPageMarkdown: (markdown) =>
    set((state) => {
      return {
        data: {
          ...state.data,
          rootPage: {
            ...state.data.rootPage,
            markdown,
          },
        },
      };
    }),

  updatePageMarkdown: (href, markdown) =>
    set((state) => {
      const updatedPages = state.data.pages.map((page) =>
        page.href === href ? { ...page, markdown } : page
      );

      return {
        data: {
          ...state.data,
          pages: updatedPages,
        },
      };
    }),
});
