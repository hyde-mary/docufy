export type Page = {
  name: string;
  path: string;
  href: string;
  markdown: string;
};

export type RootPage = {
  markdown: string;
};

export type Params = {
  id: string;
  slug: string;
};

export type TextSection = {
  type: "text";
  name: string;
};

export type LinkSection = {
  type: "link";
  name: string;
  path: string; // user editable: for example /introduction
  href: string; // auto-generated: /[id]/[...slug]/${path}
};

export type DropdownSection = {
  type: "dropdown";
  name: string;
  items: LinkSection[];
};

export type Section = TextSection | LinkSection | DropdownSection;

export type Social = {
  platform: "github" | "facebook" | "twitter";
  href: string;
};

export type NavLink = {
  name: string;
  path: string; // user editable: for example /introduction
  href: string; // auto-generated: /[id]/[...slug]/${path}
};

export type ProjectData = {
  title: string;
  navLinks: NavLink[];
  theme_toggle: boolean;
  socials: Social[];
  sections: Section[];
  params: Params;
  rootPage: RootPage;
  pages: Page[];
};
