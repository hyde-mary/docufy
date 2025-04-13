"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

import { editProjectSchema } from "@/lib/schemas/projectSchema";
import { generateSlug } from "@/utils/generateSlug";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { Save } from "lucide-react";

import { toast } from "sonner";
import EditProjectBasicSection from "../form-section/edit-basic-section";
import EditProjectAppearanceSection from "../form-section/edit-appearance-section";

const EditProjectForm = () => {
  const { user } = useUser();
  const { id } = useParams();
  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );
  const editProject = useMutation(api.projects.editProject);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
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
    if (project) {
      form.setValue("title", project.title);
      form.setValue("slug", project.slug);
      form.setValue("description", project.description);
      form.setValue("visibility", project.visibility);
      form.setValue("iconName", project.iconName);
      form.setValue("template", project.template);
    }
  }, [project, form]);

  useEffect(() => {
    if (title && title.trim() !== "") {
      form.setValue("slug", generateSlug(title));
    } else {
      form.setValue("slug", "");
    }
  }, [title, form]);

  if (!user || !project)
    return (
      <div className="grid grid-cols-1 gap-8">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-32" />
      </div>
    );

  function onSubmit(values: z.infer<typeof editProjectSchema>) {
    setLoading(true);
    try {
      if (!user) return;

      editProject({
        projectId: project._id,
        title: values.title,
        slug: values.slug,
        iconName: values.iconName,
        description: values.description,
      });

      toast.success("Project edited successfully");
      router.push(`/projects/${project._id}/${project.slug}`);
    } catch (error) {
      toast.error("An error occurred", {
        description: error as string,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <EditProjectBasicSection form={form} />

        <EditProjectAppearanceSection form={form} title={title} user={user} />

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
                  <Save className="w-4 h-4" />
                  {loading ? "Updating Project..." : "Update Project"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default EditProjectForm;
