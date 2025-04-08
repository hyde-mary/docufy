"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

import { newProjectSchema } from "@/lib/schemas/projectSchema";
import { generateSlug } from "@/utils/generateSlug";
import NewProjectBasicSection from "../form-section/new-basic-section";
import NewProjectAppearanceSection from "../form-section/new-appearance-section";
import NewProjectVisibilitySection from "../form-section/new-visibility-section";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NewProjectsForm = () => {
  const { user } = useUser();
  const createProject = useMutation(api.projects.createProject);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    try {
      setLoading(true);
      if (!user) return;

      createProject({
        title: values.title,
        userId: user.id,
        iconName: values.iconName,
        description: values.description,
        visibility: values.visibility,
        template: values.template,
      }).then((newId) => {
        toast.success("Successfully created the project!");
        setLoading(false);
        router.push(`/projects/${newId}/${values.slug}`);
      });
    } catch (error) {
      toast.error("An error occurred", {
        description: error as string,
      });
    } finally {
      setLoading(false);
    }
  }

  if (!user)
    return (
      <div className="grid grid-cols-1 gap-8">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-32" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Basic Information Section */}
          <NewProjectBasicSection form={form} />

          {/* Appearance Section */}
          <NewProjectAppearanceSection form={form} title={title} user={user} />

          {/* Visibility Section */}
          <NewProjectVisibilitySection form={form} />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className={cn(
              "gap-2 hover:cursor-pointer",
              loading && "bg-gray-500 text-gray-200"
            )}
            disabled={loading}
          >
            {loading ? "Creating Project..." : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectsForm;
