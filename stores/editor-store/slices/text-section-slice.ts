import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";
import { TextSection } from "@/types/project-data";

export interface TextSectionSlice {
  addTextSection: () => void;
  updateTextSection: (index: number, updated: TextSection) => void;
  removeTextSection: (index: number) => void;
}

export const createTextSectionSlice: StateCreator<
  BaseSlice & TextSectionSlice,
  [],
  [],
  TextSectionSlice
> = (set) => ({
  addTextSection: () =>
    set((state) => {
      const newSection: TextSection = { type: "text", name: "" };
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, newSection],
        },
      };
    }),
  updateTextSection: (index, updated) =>
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
  removeTextSection: (index) =>
    set((state) => {
      const filtered = state.data.sections.filter((_, i) => i !== index);
      return {
        data: {
          ...state.data,
          sections: filtered,
        },
      };
    }),
});
