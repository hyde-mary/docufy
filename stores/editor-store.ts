import { create } from "zustand";

type Section = {
  name: string;
  href: string;
};

type Social = {
  platform: "github" | "facebook" | "twitter";
  href: string;
};

type NavLink = {
  name: string;
  href: string;
};

type EditorData = {
  title: string;
  navLinks: NavLink[];
  theme_toggle: boolean;
  socials: Social[];
  sections: Section[];
};

type EditorStore = {
  data: EditorData;
  updateField: <K extends keyof EditorData>(
    key: K,
    value: EditorData[K]
  ) => void;

  addNavLink: () => void;
  updateNavLink: (index: number, newLink: NavLink) => void;
  removeNavLink: (index: number) => void;

  toggleThemeToggle: () => void;

  updateSocial: (platform: Social["platform"], href: string) => void;

  addSection: () => void;
  updateSection: (index: number, newSection: Section) => void;
  removeSection: (index: number) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
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
  },
  updateField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),

  addNavLink: () =>
    set((state) => {
      if (state.data.navLinks.length >= 7) return state;
      return {
        data: {
          ...state.data,
          navLinks: [...state.data.navLinks, { name: "", href: "" }],
        },
      };
    }),

  updateNavLink: (index, newLink) =>
    set((state) => {
      const updated = [...state.data.navLinks];
      updated[index] = newLink;
      return {
        data: {
          ...state.data,
          navLinks: updated,
        },
      };
    }),

  removeNavLink: (index) =>
    set((state) => {
      const filtered = state.data.navLinks.filter((_, i) => i !== index);
      return {
        data: {
          ...state.data,
          navLinks: filtered,
        },
      };
    }),

  toggleThemeToggle: () =>
    set((state) => ({
      data: {
        ...state.data,
        theme_toggle: !state.data.theme_toggle,
      },
    })),

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

  addSection: () =>
    set((state) => {
      if (state.data.sections.length >= 20) return state;
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, { name: "", href: "" }],
        },
      };
    }),

  updateSection: (index, newLink) =>
    set((state) => {
      const updated = [...state.data.sections];
      updated[index] = newLink;
      return {
        data: {
          ...state.data,
          sections: updated,
        },
      };
    }),

  removeSection: (index) =>
    set((state) => {
      const filtered = state.data.sections.filter((_, i) => i !== index);
      return {
        data: {
          ...state.data,
          sections: filtered,
        },
      };
    }),
}));
