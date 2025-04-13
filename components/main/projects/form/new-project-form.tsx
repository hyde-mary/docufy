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
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
    setLoading(true);
    try {
      if (!user) return;

      createProject({
        title: values.title,
        userId: user.id,
        iconName: values.iconName,
        slug: values.slug,
        description: values.description,
        visibility: values.visibility,
        template: values.template,
      }).then((newId) => {
        toast.success("Successfully created the project!");
        form.reset();
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
        </div>

        <div className="flex justify-end">
          <Card className="w-full">
            <CardContent className="flex items-center justify-between">
              <div>
                <Link href="/">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="py-1! px-2! hover:cursor-pointer"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-x-8">
                <p className="text-xs text-muted-foreground">
                  You can rename your project later
                </p>
                <Button
                  type="submit"
                  variant={"default"}
                  size={"sm"}
                  className={cn(
                    "gap-2 hover:cursor-pointer py-1! px-2!",
                    loading && "bg-gray-500 text-gray-200"
                  )}
                  disabled={loading}
                >
                  {loading ? "Creating Project..." : "Create Project"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectsForm;
