import { create } from "zustand";
import { BaseSlice, createBaseSlice } from "./slices/base-slice";
import { createNavLinksSlice, NavLinksSlice } from "./slices/nav-links-slice";
import { createThemesSlice, ThemesSlice } from "./slices/theme-slice";
import { createSocialsSlice, SocialsSlice } from "./slices/socials-slice";
import {
  createTextSectionSlice,
  TextSectionSlice,
} from "./slices/text-section-slice";
import {
  createLinkSectionSlice,
  LinkSectionSlice,
} from "./slices/link-section-slice";
import {
  createDropdownSectionSlice,
  DropdownSectionSlice,
} from "./slices/dropdown-section-slice";
import { createPagesSlice, PagesSlice } from "./slices/pages-slice";

export type EditorStore = BaseSlice &
  NavLinksSlice &
  ThemesSlice &
  SocialsSlice &
  TextSectionSlice &
  LinkSectionSlice &
  DropdownSectionSlice &
  PagesSlice;

export const useEditorStore = create<EditorStore>()((...a) => ({
  ...createBaseSlice(...a),
  ...createNavLinksSlice(...a),
  ...createThemesSlice(...a),
  ...createSocialsSlice(...a),
  ...createTextSectionSlice(...a),
  ...createLinkSectionSlice(...a),
  ...createDropdownSectionSlice(...a),
  ...createPagesSlice(...a),
}));
