import { create } from "zustand";

type TextSection = {
  type: "text";
  name: string;
};

type LinkSection = {
  type: "link";
  name: string;
  href: string;
};

type DropdownSection = {
  type: "dropdown";
  name: string;
  items: LinkSection[];
};

type Section = TextSection | LinkSection | DropdownSection;

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
  // this is the data itself
  data: EditorData;

  // update field
  updateField: <K extends keyof EditorData>(
    key: K,
    value: EditorData[K]
  ) => void;

  // nav link
  addNavLink: () => void;
  updateNavLink: (index: number, newLink: NavLink) => void;
  removeNavLink: (index: number) => void;

  // this toggles the theme
  toggleThemeToggle: () => void;

  // this toggles the socials
  updateSocial: (platform: Social["platform"], href: string) => void;

  // this is for section where the section is a type of text
  addTextSection: () => void;
  updateTextSection: (index: number, updated: Section) => void;
  removeTextSection: (index: number) => void;

  // this is for section where the section is a type of link
  addLinkSection: () => void;
  updateLinkSection: (index: number, updated: LinkSection) => void;
  removeLinkSection: (index: number) => void;
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

  addTextSection: () =>
    set((state) => {
      if (state.data.sections.length >= 20) return state;
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

  addLinkSection: () =>
    set((state) => {
      if (state.data.sections.length >= 20) return state;
      const newSection: LinkSection = { type: "link", name: "", href: "" };
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, newSection],
        },
      };
    }),

  updateLinkSection: (index, updated) =>
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

  removeLinkSection: (index) =>
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
