"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";

import { newProjectSchema } from "@/lib/schemas/projectSchema";
import { generateSlug } from "@/utils/generateSlug";
import NewProjectBasicSection from "../form-section/new-basic-section";
import NewProjectAppearanceSection from "../form-section/new-appearance-section";
import NewProjectVisibilitySection from "../form-section/new-visibility-section";

const NewProjectsForm = () => {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      visibility: "Private",
      iconName: "Rocket",
      template: "Default",
    },
  });

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (title && title.trim() !== "") {
      form.setValue("slug", generateSlug(title));
    } else {
      form.setValue("slug", "");
    }
  }, [title, form]);

  function onSubmit(values: z.infer<typeof newProjectSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Basic Information Section */}
          <NewProjectBasicSection form={form} />

          {/* Appearance Section */}
          <NewProjectAppearanceSection form={form} title={title} />

          {/* Visibility Section */}
          <NewProjectVisibilitySection form={form} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectsForm;
