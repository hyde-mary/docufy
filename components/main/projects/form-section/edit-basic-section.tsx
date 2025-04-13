"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

const EditProjectBasicSection = ({
  form,
}: {
  form: UseFormReturn<
    {
      title: string;
      template: "Default";
      slug: string;
      visibility: "Public" | "Private";
      description?: string | undefined;
      iconName?: string | undefined;
    },
    {
      title: string;
      template: "Default";
      slug: string;
      visibility: "Public" | "Private";
      description?: string | undefined;
      iconName?: string | undefined;
    }
  >;
}) => {
  return (
    <Card>
      <CardContent className="px-6 py-2 space-y-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          Basic Information
        </h3>

        {/* Project Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Project Title
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input placeholder="The Hydemary Project" {...field} />
                </FormControl>
                <FormDescription className="text-muted-foreground text-sm">
                  This is the title of your project. Make it meaningful.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Project Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Project Slug
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input
                    placeholder="the-hydemary-project"
                    {...field}
                    readOnly
                    className="bg-muted"
                    disabled
                  />
                </FormControl>
                <FormDescription className="text-muted-foreground text-sm">
                  The slug is automatically generated from your project title.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Description (Optional)
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Textarea
                    placeholder="My Very First Project Documentation in Docufy"
                    className="max-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-muted-foreground text-sm">
                  A simple definitive description for your project.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default EditProjectBasicSection;
