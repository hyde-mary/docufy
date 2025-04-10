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
  // data
  data: EditorData;

  // update field used for title
  updateField: <K extends keyof EditorData>(
    key: K,
    value: EditorData[K]
  ) => void;

  // nav links
  addNavLink: () => void;
  updateNavLink: (index: number, newLink: NavLink) => void;
  removeNavLink: (index: number) => void;

  // theme toggle
  toggleThemeToggle: () => void;

  // socials
  updateSocial: (platform: Social["platform"], href: string) => void;

  // text section
  addTextSection: () => void;
  updateTextSection: (index: number, updated: TextSection) => void;
  removeTextSection: (index: number) => void;

  // link section
  addLinkSection: () => void;
  updateLinkSection: (index: number, updated: LinkSection) => void;
  removeLinkSection: (index: number) => void;

  // dropdown section
  addDropdownSection: () => void;
  updateDropdownSection: (index: number, updated: DropdownSection) => void;
  removeDropdownSection: (index: number) => void;
  addItemToDropdown: (index: number) => void;
  updateItemInDropdown: (
    sectionIndex: number,
    itemIndex: number,
    updatedItem: LinkSection
  ) => void;
  removeItemFromDropdown: (sectionIndex: number, itemIndex: number) => void;
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

  addDropdownSection: () =>
    set((state) => {
      const newSection: DropdownSection = {
        type: "dropdown",
        name: "",
        items: [],
      };
      return {
        data: {
          ...state.data,
          sections: [...state.data.sections, newSection],
        },
      };
    }),
  updateDropdownSection: (index, updated) =>
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
  removeDropdownSection: (index) =>
    set((state) => {
      const filtered = state.data.sections.filter((_, i) => i !== index);
      return {
        data: {
          ...state.data,
          sections: filtered,
        },
      };
    }),
  addItemToDropdown: (index: number) =>
    set((state) => {
      const section = state.data.sections[index];
      if (!section || section.type !== "dropdown") return state;

      const updatedDropdown: DropdownSection = {
        ...section,
        items: [...section.items, { name: "", href: "", type: "link" }],
      };

      const updatedSections = [...state.data.sections];
      updatedSections[index] = updatedDropdown;

      return {
        data: {
          ...state.data,
          sections: updatedSections,
        },
      };
    }),
  updateItemInDropdown: (
    sectionIndex: number,
    itemIndex: number,
    updatedItem: LinkSection
  ) =>
    set((state) => {
      const section = state.data.sections[sectionIndex];
      if (!section || section.type !== "dropdown") return state;

      const updatedItems = [...section.items];
      updatedItems[itemIndex] = updatedItem;

      const updatedDropdown: DropdownSection = {
        ...section,
        items: updatedItems,
      };

      const updatedSections = [...state.data.sections];
      updatedSections[sectionIndex] = updatedDropdown;

      return {
        data: {
          ...state.data,
          sections: updatedSections,
        },
      };
    }),
  removeItemFromDropdown: (sectionIndex: number, itemIndex: number) =>
    set((state) => {
      const section = state.data.sections[sectionIndex];
      if (!section || section.type !== "dropdown") return state;

      const updatedItems = section.items.filter((_, i) => i !== itemIndex);

      const updatedDropdown: DropdownSection = {
        ...section,
        items: updatedItems,
      };

      const updatedSections = [...state.data.sections];
      updatedSections[sectionIndex] = updatedDropdown;

      return {
        data: {
          ...state.data,
          sections: updatedSections,
        },
      };
    }),
}));
