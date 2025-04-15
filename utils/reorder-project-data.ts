import { ProjectData } from "@/types/project-data";

export const reorderProjectData = (projectData: ProjectData) => {
  return {
    title: projectData.title,
    navLinks: projectData.navLinks,
    theme_toggle: projectData.theme_toggle,
    socials: projectData.socials,
    sections: projectData.sections,
    params: projectData.params,
    rootPage: projectData.rootPage,
    pages: projectData.pages,
  };
};
