import { z } from "zod";

const shortString = (min: number, max: number) =>
  z
    .string()
    .min(min, { message: `Must be at least ${min} characters` })
    .max(max, { message: `Must be at most ${max} characters` })
    .trim();

export const VISIBILITY_OPTIONS = ["Public", "Private"] as const;
export const TEMPLATE_OPTIONS = ["Default"] as const;

export const newProjectSchema = z.object({
  title: shortString(2, 30)
    .describe("The project's display name")
    .refine((val) => val.trim().length > 0, {
      message: "Title cannot be empty",
    }),

  slug: z.string().min(1).describe("Auto-generated URL-friendly identifier"),

  description: shortString(2, 50)
    .describe("Brief project description")
    .optional(),

  visibility: z.enum(VISIBILITY_OPTIONS),

  icon: z
    .string()
    .min(1, { message: "Please select an icon" })
    .describe("Visual identifier for the project")
    .optional(),

  template: z.enum(TEMPLATE_OPTIONS).describe("Project template to use"),
});
