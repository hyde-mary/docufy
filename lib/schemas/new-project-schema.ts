import { z } from "zod";

const shortString = (min: number, max: number) =>
  z
    .string()
    .min(min, { message: `Must be at least ${min} characters` })
    .max(max, { message: `Must be at most ${max} characters` })
    .trim();

export const VISIBILITY_OPTIONS = ["Public", "Private"] as const;
export const TEMPLATE_OPTIONS = ["Default"] as const;
export const ICON_OPTIONS = [
  "Rocket",
  "Book",
  "Code",
  "File",
  "Presentation",
  "None",
] as const;

export const newProjectSchema = z.object({
  title: shortString(5, 50)
    .describe("The project's display name")
    .refine((val) => val.trim().length > 0, {
      message: "Title cannot be empty",
    }),

  slug: z.string().min(0).describe("Auto-generated URL-friendly identifier"),

  iconName: z.enum(ICON_OPTIONS).describe("Name of the icon for reference"),

  description: shortString(0, 500).describe("Project description").optional(),

  template: z.enum(TEMPLATE_OPTIONS).describe("Project template to use"),

  visibility: z
    .enum(VISIBILITY_OPTIONS)
    .describe("Project visbility on create"),
});
