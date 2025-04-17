import { StateCreator } from "zustand";
import { ProjectData } from "@/types/project-data";

export interface BaseSlice {
  data: ProjectData;
  setData: (editorData: ProjectData) => void;
  updateField: <K extends keyof ProjectData>(
    key: K,
    value: ProjectData[K]
  ) => void;
  setParams: (id: string, slug: string) => void;
}

export const createBaseSlice: StateCreator<BaseSlice> = (set) => ({
  data: {
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
  },

  setData: (editorData: ProjectData) => set({ data: editorData }),

  updateField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),

  setParams: (id: string, slug: string) =>
    set((state) => ({
      data: {
        ...state.data,
        params: {
          id,
          slug,
        },
      },
    })),
});
