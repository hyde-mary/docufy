import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";

export interface ThemesSlice {
  toggleThemeToggle: () => void;
}

export const createThemesSlice: StateCreator<
  BaseSlice & ThemesSlice,
  [],
  [],
  ThemesSlice
> = (set) => ({
  toggleThemeToggle: () =>
    set((state) => ({
      data: {
        ...state.data,
        theme_toggle: !state.data.theme_toggle,
      },
    })),
});
