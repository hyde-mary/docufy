"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  BookMarked,
  CheckSquare,
  FileText,
  Globe,
  Lock,
  Package,
  Rocket,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const newProjectFormSchema = z.object({
  title: z.string().min(2).max(30),
  slug: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  visibility: z.enum(["Public", "Private"]),
  icon: z.string(),
});

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const NewProjectsForm = () => {
  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      visibility: "Private",
      icon: "",
    },
  });

  const titleValue = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (titleValue && titleValue.trim() !== "") {
      form.setValue("slug", generateSlug(titleValue));
    } else {
      form.setValue("slug", "");
    }
  }, [titleValue, form]);

  function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Basic Information Section */}
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
                  <FormItem className="grid grid-cols-[150px_1fr] gap-4 items-start">
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
                  <FormItem className="grid grid-cols-[150px_1fr] gap-4 items-start">
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
                        The slug is automatically generated from your project
                        title.
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
                  <FormItem className="grid grid-cols-[150px_1fr] gap-4 items-start">
                    <FormLabel className="text-sm font-medium mt-2">
                      Description
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

          {/* Appearance Section */}
          <Card>
            <CardContent className="px-6 py-2 space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Appearance
              </h3>

              {/* Icon Option */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[150px_1fr] gap-4 items-start">
                    <FormLabel className="text-sm font-medium mt-2">
                      Project Icon
                    </FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rocket">
                              <div className="flex items-center gap-2">
                                <Rocket className="h-4 w-4" /> Rocket
                              </div>
                            </SelectItem>
                            <SelectItem value="FileText">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Document
                              </div>
                            </SelectItem>
                            <SelectItem value="Package">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4" /> Package
                              </div>
                            </SelectItem>
                            <SelectItem value="Globe">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" /> Globe
                              </div>
                            </SelectItem>
                            <SelectItem value="CheckSquare">
                              <div className="flex items-center gap-2">
                                <CheckSquare className="h-4 w-4" /> Checklist
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
            </CardContent>
          </Card>

          {/* Visibility Section */}
          <Card>
            <CardContent className="px-6 py-2 space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Visibility Settings
              </h3>

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[150px_1fr] gap-4 items-start">
                    <FormLabel className="text-sm font-medium mt-2">
                      Project Visibility
                    </FormLabel>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === "Private" ? "default" : "outline"
                          }
                          onClick={() => form.setValue("visibility", "Private")}
                          className="flex-1 gap-2"
                        >
                          <Lock className="h-4 w-4" />
                          Private
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === "Public" ? "default" : "outline"
                          }
                          onClick={() => form.setValue("visibility", "Public")}
                          className="flex-1 gap-2"
                        >
                          <BookMarked className="h-4 w-4" />
                          Public
                        </Button>
                      </div>
                      <FormDescription className="text-muted-foreground text-sm">
                        {field.value === "Public" ? (
                          <>
                            This project will be visible to anyone with the
                            link.
                          </>
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Rocket className="h-4 w-4" />
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectsForm;
