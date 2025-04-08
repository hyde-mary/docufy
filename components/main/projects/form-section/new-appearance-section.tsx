import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { Book, Code, LayoutTemplate, Rocket } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const NewProjectAppearanceSection = ({
  form,
  title,
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
  title: string;
}) => {
  const { user } = useUser();

  return (
    <Card>
      <CardContent className="px-6 py-2 space-y-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          Appearance
        </h3>

        {/* Icon Option */}
        <FormField
          control={form.control}
          name="iconName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Project Icon
              </FormLabel>
              <div className="space-y-2 w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!user}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rocket">
                        <div className="flex items-center gap-2">
                          <Rocket className="h-4 w-4" />{" "}
                          {title
                            ? title
                            : user
                              ? `${user.username}'s Experience`
                              : ""}
                        </div>
                      </SelectItem>
                      <SelectItem value="Book">
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4" />{" "}
                          {title
                            ? title
                            : user
                              ? `${user.username}'s Collection`
                              : ""}
                        </div>
                      </SelectItem>
                      <SelectItem value="Code">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />{" "}
                          {title
                            ? title
                            : user
                              ? `${user.username}'s Instance`
                              : ""}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-muted-foreground text-sm">
                  Choose the icon that best represents your project.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Project Template
              </FormLabel>
              <div className="space-y-2 w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">
                        <div className="flex items-center gap-2">
                          <LayoutTemplate className="h-4 w-4" /> Default
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-muted-foreground text-sm">
                  Choose the template for your project.
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

export default NewProjectAppearanceSection;
