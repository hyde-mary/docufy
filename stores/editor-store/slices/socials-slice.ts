import { StateCreator } from "zustand";
import { BaseSlice } from "./base-slice";
import { Social } from "@/types/project-data";

export interface SocialsSlice {
  updateSocial: (platform: Social["platform"], href: string) => void;
}

export const createSocialsSlice: StateCreator<
  BaseSlice & SocialsSlice,
  [],
  [],
  SocialsSlice
> = (set) => ({
  updateSocial: (platform, href) =>
    set((state) => {
      const updatedSocials = state.data.socials.map((social) =>
        social.platform === platform ? { ...social, href } : social
      );
      return {
        data: {
          ...state.data,
          socials: updatedSocials,
        },
      };
    }),
});
