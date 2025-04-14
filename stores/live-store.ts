import { LiveData } from "@/types/live";
import { create } from "zustand";

interface LiveStore {
  data: LiveData | null;
  setData: (data: LiveStore["data"]) => void;
}

export const useLiveStore = create<LiveStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
