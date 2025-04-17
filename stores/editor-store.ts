// import { create } from "zustand";

// import {
//   DropdownSection,
//   ProjectData,
//   LinkSection,
//   NavLink,
//   Social,
//   TextSection,
// } from "@/types/project-data";

// type EditorStore = {
//   // data
//   data: ProjectData;

//   // set data method
//   setData: (editorData: ProjectData) => void;

//   // update field used for title
//   updateField: <K extends keyof ProjectData>(
//     key: K,
//     value: ProjectData[K]
//   ) => void;

//   // set params, we store the params for dynamic routing
//   setParams: (id: string, slug: string) => void;

//   // nav links
//   addNavLink: () => void;
//   updateNavLink: (index: number, newLink: NavLink) => void;
//   removeNavLink: (index: number) => void;

//   // theme toggle
//   toggleThemeToggle: () => void;

//   // socials
//   updateSocial: (platform: Social["platform"], href: string) => void;

//   // text section
//   addTextSection: () => void;
//   updateTextSection: (index: number, updated: TextSection) => void;
//   removeTextSection: (index: number) => void;

//   // link section
//   addLinkSection: () => void;
//   updateLinkSection: (index: number, updated: LinkSection) => void;
//   removeLinkSection: (index: number) => void;

//   // dropdown section
//   addDropdownSection: () => void;
//   updateDropdownSection: (index: number, updated: DropdownSection) => void;
//   removeDropdownSection: (index: number) => void;
//   addItemToDropdown: (index: number) => void;
//   updateItemInDropdown: (
//     sectionIndex: number,
//     itemIndex: number,
//     updatedItem: LinkSection
//   ) => void;
//   removeItemFromDropdown: (sectionIndex: number, itemIndex: number) => void;

//   // root page methods
//   updateRootPageMarkdown: (markdown: string) => void;

//   // page methods
//   updatePageMarkdown: (href: string, markdown: string) => void;
// };

// export const useEditorStore = create<EditorStore>((set) => ({
//   data: {
//     title: "",
//     navLinks: [],
//     theme_toggle: false,
//     socials: [
//       { platform: "github", href: "" },
//       { platform: "facebook", href: "" },
//       { platform: "twitter", href: "" },
//     ],
//     sections: [],
//     params: {
//       id: "",
//       slug: "",
//     },
//     rootPage: {
//       markdown: "",
//     },
//     pages: [],
//   },

//   setData: (editorData: ProjectData) => set({ data: editorData }),

//   updateField: (key, value) =>
//     set((state) => ({
//       data: {
//         ...state.data,
//         [key]: value,
//       },
//     })),

//   setParams: (id: string, slug: string) =>
//     set((state) => ({
//       data: {
//         ...state.data,
//         params: {
//           id,
//           slug,
//         },
//       },
//     })),

//   addNavLink: () =>
//     set((state) => {
//       if (state.data.navLinks.length >= 7) return state;

//       const newNavLink: NavLink = { name: "", path: "", href: "" };

//       return {
//         data: {
//           ...state.data,
//           navLinks: [...state.data.navLinks, newNavLink],
//         },
//       };
//     }),
//   updateNavLink: (index, newLink) =>
//     set((state) => {
//       const { id, slug } = state.data.params;
//       const computedHref = `/editor/${id}/${slug}/${newLink.path.replace(/^\/+/, "")}`;

//       const originalLink = state.data.navLinks[index];
//       const originalHref = originalLink?.href || "";
//       const originalPath = originalLink?.path || "";

//       const updatedNavLinks = [...state.data.navLinks];
//       updatedNavLinks[index] = {
//         ...newLink,
//         href: computedHref,
//       };

//       const updatedPages = [...state.data.pages];

//       const pathHasChanged = originalPath !== newLink.path;

//       const originalPageIndex = updatedPages.findIndex(
//         (page) => page.href === originalHref
//       );
//       const newPageIndex = updatedPages.findIndex(
//         (page) => page.href === computedHref
//       );

//       const otherNavLinksWithOriginalHref = state.data.navLinks.some(
//         (link, i) => i !== index && link.href === originalHref
//       );

//       const anySectionWithOriginalHref = state.data.sections.some(
//         (section) =>
//           (section.type === "link" && section.href === originalHref) ||
//           (section.type === "dropdown" &&
//             section.items.some((item) => item.href === originalHref))
//       );

//       const otherElementsUsingOriginalHref =
//         otherNavLinksWithOriginalHref || anySectionWithOriginalHref;

//       if (pathHasChanged && newLink.path.trim() !== "") {
//         if (newPageIndex === -1) {
//           if (originalPageIndex !== -1) {
//             if (!otherElementsUsingOriginalHref) {
//               updatedPages[originalPageIndex] = {
//                 ...updatedPages[originalPageIndex],
//                 name: newLink.name,
//                 path: newLink.path,
//                 href: computedHref,
//                 markdown: updatedPages[originalPageIndex].markdown || "",
//               };
//             } else {
//               updatedPages.push({
//                 name: newLink.name,
//                 path: newLink.path,
//                 href: computedHref,
//                 markdown: "",
//               });
//             }
//           } else {
//             updatedPages.push({
//               name: newLink.name,
//               path: newLink.path,
//               href: computedHref,
//               markdown: "",
//             });
//           }
//         } else if (
//           originalPageIndex !== -1 &&
//           !otherElementsUsingOriginalHref
//         ) {
//           updatedPages.splice(originalPageIndex, 1);
//         }
//       } else if (originalPageIndex !== -1) {
//         updatedPages[originalPageIndex] = {
//           ...updatedPages[originalPageIndex],
//           name: newLink.name,
//         };
//       }

//       return {
//         data: {
//           ...state.data,
//           navLinks: updatedNavLinks,
//           pages: updatedPages,
//         },
//       };
//     }),
//   removeNavLink: (index) =>
//     set((state) => {
//       const navLinkToRemove = state.data.navLinks[index];
//       const filteredNavLinks = state.data.navLinks.filter(
//         (_, i) => i !== index
//       );

//       const href = navLinkToRemove?.href;

//       const otherNavLinksUsingHref = filteredNavLinks.some(
//         (link) => link.href === href
//       );

//       const anySectionUsingHref = state.data.sections.some(
//         (section) =>
//           (section.type === "link" && section.href === href) ||
//           (section.type === "dropdown" &&
//             section.items.some((item) => item.href === href))
//       );

//       let updatedPages = [...state.data.pages];
//       if (!otherNavLinksUsingHref && !anySectionUsingHref && href) {
//         updatedPages = updatedPages.filter((page) => page.href !== href);
//       }

//       return {
//         data: {
//           ...state.data,
//           navLinks: filteredNavLinks,
//           pages: updatedPages,
//         },
//       };
//     }),

//   toggleThemeToggle: () =>
//     set((state) => ({
//       data: {
//         ...state.data,
//         theme_toggle: !state.data.theme_toggle,
//       },
//     })),

//   updateSocial: (platform, href) =>
//     set((state) => {
//       const updatedSocials = state.data.socials.map((social) =>
//         social.platform === platform ? { ...social, href } : social
//       );
//       return {
//         data: {
//           ...state.data,
//           socials: updatedSocials,
//         },
//       };
//     }),

//   addTextSection: () =>
//     set((state) => {
//       const newSection: TextSection = { type: "text", name: "" };
//       return {
//         data: {
//           ...state.data,
//           sections: [...state.data.sections, newSection],
//         },
//       };
//     }),
//   updateTextSection: (index, updated) =>
//     set((state) => {
//       const updatedSections = [...state.data.sections];
//       updatedSections[index] = updated;
//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//         },
//       };
//     }),
//   removeTextSection: (index) =>
//     set((state) => {
//       const filtered = state.data.sections.filter((_, i) => i !== index);
//       return {
//         data: {
//           ...state.data,
//           sections: filtered,
//         },
//       };
//     }),

//   addLinkSection: () =>
//     set((state) => {
//       const newSection: LinkSection = {
//         type: "link",
//         name: "",
//         path: "",
//         href: "",
//       };
//       return {
//         data: {
//           ...state.data,
//           sections: [...state.data.sections, newSection],
//         },
//       };
//     }),
//   updateLinkSection: (index, updated) =>
//     set((state) => {
//       const { id, slug } = state.data.params;
//       const computedHref = `/editor/${id}/${slug}/${updated.path.replace(/^\/+/, "")}`;

//       const originalSection = state.data.sections[index];
//       const originalHref =
//         originalSection?.type === "link" ? originalSection.href : "";
//       const originalPath =
//         originalSection?.type === "link" ? originalSection.path : "";

//       const updatedSections = [...state.data.sections];
//       updatedSections[index] = {
//         ...updated,
//         href: computedHref,
//       };

//       const updatedPages = [...state.data.pages];

//       const pathHasChanged = originalPath !== updated.path;

//       const originalPageIndex = updatedPages.findIndex(
//         (page) => page.href === originalHref
//       );
//       const newPageIndex = updatedPages.findIndex(
//         (page) => page.href === computedHref
//       );

//       const otherSectionsWithOriginalHref = state.data.sections.some(
//         (section, i) =>
//           i !== index &&
//           ((section.type === "link" && section.href === originalHref) ||
//             (section.type === "dropdown" &&
//               section.items.some((item) => item.href === originalHref)))
//       );

//       const navLinksWithOriginalHref = state.data.navLinks.some(
//         (link) => link.href === originalHref
//       );

//       const otherElementsUsingOriginalHref =
//         otherSectionsWithOriginalHref || navLinksWithOriginalHref;

//       if (pathHasChanged && updated.path.trim() !== "") {
//         if (newPageIndex === -1) {
//           if (originalPageIndex !== -1) {
//             if (!otherElementsUsingOriginalHref) {
//               updatedPages[originalPageIndex] = {
//                 ...updatedPages[originalPageIndex],
//                 name: updated.name,
//                 path: updated.path,
//                 href: computedHref,
//                 markdown: updatedPages[originalPageIndex].markdown || "",
//               };
//             } else {
//               updatedPages.push({
//                 name: updated.name,
//                 path: updated.path,
//                 href: computedHref,
//                 markdown: "",
//               });
//             }
//           } else {
//             updatedPages.push({
//               name: updated.name,
//               path: updated.path,
//               href: computedHref,
//               markdown: "",
//             });
//           }
//         } else if (
//           originalPageIndex !== -1 &&
//           !otherElementsUsingOriginalHref
//         ) {
//           updatedPages.splice(originalPageIndex, 1);
//         }
//       } else if (originalPageIndex !== -1) {
//         updatedPages[originalPageIndex] = {
//           ...updatedPages[originalPageIndex],
//           name: updated.name,
//         };
//       }

//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//           pages: updatedPages,
//         },
//       };
//     }),
//   removeLinkSection: (index) =>
//     set((state) => {
//       const sectionToRemove = state.data.sections[index];
//       if (!sectionToRemove || sectionToRemove.type !== "link") {
//         return {
//           data: {
//             ...state.data,
//             sections: state.data.sections.filter((_, i) => i !== index),
//           },
//         };
//       }

//       const href = sectionToRemove.href;
//       const filteredSections = state.data.sections.filter(
//         (_, i) => i !== index
//       );

//       const otherSectionsUsingHref = filteredSections.some(
//         (section) =>
//           (section.type === "link" && section.href === href) ||
//           (section.type === "dropdown" &&
//             section.items.some((item) => item.href === href))
//       );

//       const anyNavLinkUsingHref = state.data.navLinks.some(
//         (link) => link.href === href
//       );

//       let updatedPages = [...state.data.pages];
//       if (!otherSectionsUsingHref && !anyNavLinkUsingHref && href) {
//         updatedPages = updatedPages.filter((page) => page.href !== href);
//       }

//       return {
//         data: {
//           ...state.data,
//           sections: filteredSections,
//           pages: updatedPages,
//         },
//       };
//     }),

//   addDropdownSection: () =>
//     set((state) => {
//       const newSection: DropdownSection = {
//         type: "dropdown",
//         name: "",
//         items: [],
//       };
//       return {
//         data: {
//           ...state.data,
//           sections: [...state.data.sections, newSection],
//         },
//       };
//     }),
//   updateDropdownSection: (index, updated) =>
//     set((state) => {
//       const updatedSections = [...state.data.sections];
//       updatedSections[index] = updated;
//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//         },
//       };
//     }),
//   removeDropdownSection: (index) =>
//     set((state) => {
//       const section = state.data.sections[index];

//       if (!section || section.type !== "dropdown") {
//         return {
//           data: {
//             ...state.data,
//             sections: state.data.sections.filter((_, i) => i !== index),
//           },
//         };
//       }

//       const itemHrefs =
//         section.type === "dropdown"
//           ? section.items.map((item) => item.href)
//           : [];

//       const filteredSections = state.data.sections.filter(
//         (_, i) => i !== index
//       );

//       let updatedPages = [...state.data.pages];

//       itemHrefs.forEach((href) => {
//         if (!href) return; // Skip empty hrefs

//         const otherSectionsUsingHref = filteredSections.some(
//           (section) =>
//             (section.type === "link" && section.href === href) ||
//             (section.type === "dropdown" &&
//               section.items.some((item) => item.href === href))
//         );

//         const anyNavLinkUsingHref = state.data.navLinks.some(
//           (link) => link.href === href
//         );

//         if (!otherSectionsUsingHref && !anyNavLinkUsingHref) {
//           updatedPages = updatedPages.filter((page) => page.href !== href);
//         }
//       });

//       return {
//         data: {
//           ...state.data,
//           sections: filteredSections,
//           pages: updatedPages,
//         },
//       };
//     }),
//   addItemToDropdown: (index: number) =>
//     set((state) => {
//       const section = state.data.sections[index];
//       if (!section || section.type !== "dropdown") return state;

//       const updatedDropdown: DropdownSection = {
//         ...section,
//         items: [
//           ...section.items,
//           { name: "", href: "", path: "", type: "link" },
//         ],
//       };

//       const updatedSections = [...state.data.sections];
//       updatedSections[index] = updatedDropdown;

//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//         },
//       };
//     }),
//   updateItemInDropdown: (
//     sectionIndex: number,
//     itemIndex: number,
//     updatedItem: LinkSection
//   ) =>
//     set((state) => {
//       const section = state.data.sections[sectionIndex];
//       if (!section || section.type !== "dropdown") return state;

//       const { id, slug } = state.data.params;
//       const computedHref = `/editor/${id}/${slug}/${updatedItem.path.replace(/^\/+/, "")}`;

//       const originalItem = section.items[itemIndex];
//       const originalHref = originalItem?.href || "";
//       const originalPath = originalItem?.path || "";

//       const updatedItemWithHref = {
//         ...updatedItem,
//         href: computedHref,
//       };

//       const updatedItems = [...section.items];
//       updatedItems[itemIndex] = updatedItemWithHref;

//       const updatedDropdown: DropdownSection = {
//         ...section,
//         items: updatedItems,
//       };

//       const updatedSections = [...state.data.sections];
//       updatedSections[sectionIndex] = updatedDropdown;

//       const updatedPages = [...state.data.pages];

//       const pathHasChanged = originalPath !== updatedItem.path;

//       const originalPageIndex = updatedPages.findIndex(
//         (page) => page.href === originalHref
//       );
//       const newPageIndex = updatedPages.findIndex(
//         (page) => page.href === computedHref
//       );

//       const otherDropdownItemsWithOriginalHref = state.data.sections.some(
//         (s) => {
//           if (s.type !== "dropdown") return false;

//           return s.items.some(
//             (item, i) =>
//               !(s === section && i === itemIndex) && item.href === originalHref
//           );
//         }
//       );

//       const linkSectionsWithOriginalHref = state.data.sections.some(
//         (s) => s.type === "link" && s.href === originalHref
//       );

//       const navLinksWithOriginalHref = state.data.navLinks.some(
//         (link) => link.href === originalHref
//       );

//       const otherElementsUsingOriginalHref =
//         otherDropdownItemsWithOriginalHref ||
//         linkSectionsWithOriginalHref ||
//         navLinksWithOriginalHref;

//       if (pathHasChanged && updatedItem.path.trim() !== "") {
//         if (newPageIndex === -1) {
//           if (originalPageIndex !== -1) {
//             if (!otherElementsUsingOriginalHref) {
//               updatedPages[originalPageIndex] = {
//                 ...updatedPages[originalPageIndex],
//                 name: updatedItem.name,
//                 path: updatedItem.path,
//                 href: computedHref,
//                 markdown: updatedPages[originalPageIndex].markdown || "",
//               };
//             } else {
//               updatedPages.push({
//                 name: updatedItem.name,
//                 path: updatedItem.path,
//                 href: computedHref,
//                 markdown: "",
//               });
//             }
//           } else {
//             updatedPages.push({
//               name: updatedItem.name,
//               path: updatedItem.path,
//               href: computedHref,
//               markdown: "",
//             });
//           }
//         } else if (
//           originalPageIndex !== -1 &&
//           !otherElementsUsingOriginalHref
//         ) {
//           updatedPages.splice(originalPageIndex, 1);
//         }
//       } else if (originalPageIndex !== -1) {
//         updatedPages[originalPageIndex] = {
//           ...updatedPages[originalPageIndex],
//           name: updatedItem.name,
//         };
//       }

//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//           pages: updatedPages,
//         },
//       };
//     }),
//   removeItemFromDropdown: (sectionIndex: number, itemIndex: number) =>
//     set((state) => {
//       const section = state.data.sections[sectionIndex];
//       if (!section || section.type !== "dropdown") return state;

//       const itemToRemove = section.items[itemIndex];
//       const href = itemToRemove?.href;

//       const updatedItems = section.items.filter((_, i) => i !== itemIndex);

//       const updatedDropdown: DropdownSection = {
//         ...section,
//         items: updatedItems,
//       };

//       const updatedSections = [...state.data.sections];
//       updatedSections[sectionIndex] = updatedDropdown;

//       const otherDropdownItemsUsingHref = state.data.sections.some((s) => {
//         if (s.type !== "dropdown") return false;

//         if (s === section) {
//           return updatedItems.some((item) => item.href === href);
//         } else {
//           return s.items.some((item) => item.href === href);
//         }
//       });

//       const anyLinkSectionUsingHref = state.data.sections.some(
//         (s) => s.type === "link" && s.href === href
//       );

//       const anyNavLinkUsingHref = state.data.navLinks.some(
//         (link) => link.href === href
//       );

//       let updatedPages = [...state.data.pages];
//       if (
//         !otherDropdownItemsUsingHref &&
//         !anyLinkSectionUsingHref &&
//         !anyNavLinkUsingHref &&
//         href
//       ) {
//         updatedPages = updatedPages.filter((page) => page.href !== href);
//       }

//       return {
//         data: {
//           ...state.data,
//           sections: updatedSections,
//           pages: updatedPages,
//         },
//       };
//     }),

//   updateRootPageMarkdown: (markdown) =>
//     set((state) => {
//       return {
//         data: {
//           ...state.data,
//           rootPage: {
//             ...state.data.rootPage,
//             markdown,
//           },
//         },
//       };
//     }),

//   updatePageMarkdown: (href, markdown) =>
//     set((state) => {
//       const updatedPages = state.data.pages.map((page) =>
//         page.href === href ? { ...page, markdown } : page
//       );

//       return {
//         data: {
//           ...state.data,
//           pages: updatedPages,
//         },
//       };
//     }),
// }));
