import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookMarked, Lock } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const NewProjectVisibilitySection = ({
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
          Visibility Settings
        </h3>

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <FormLabel className="text-sm font-medium mt-2">
                Project Visibility
              </FormLabel>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={field.value === "Private" ? "default" : "outline"}
                    onClick={() => form.setValue("visibility", "Private")}
                    className="flex-1 gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Private
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "Public" ? "default" : "outline"}
                    onClick={() => form.setValue("visibility", "Public")}
                    className="flex-1 gap-2"
                  >
                    <BookMarked className="h-4 w-4" />
                    Public
                  </Button>
                </div>
                <FormDescription className="text-muted-foreground text-sm">
                  {field.value === "Public" ? (
                    <>This project will be visible to anyone with the link.</>
                  ) : (
                    <>
                      This project will only be visible to you and
                      collaborators.
                    </>
                  )}
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

export default NewProjectVisibilitySection;
