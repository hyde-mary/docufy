import { ProjectData } from "@/types/project-data";
import { create } from "zustand";

interface LiveStore {
  data: ProjectData | null;
  setData: (data: LiveStore["data"]) => void;
}

export const useLiveStore = create<LiveStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
