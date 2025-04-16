"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Book,
  Code,
  Eye,
  File,
  Globe,
  Info,
  Lock,
  MinusCircle,
  Palette,
  PlusCircle,
  PlusSquare,
  Presentation,
  Rocket,
  X,
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/lib/schemas/create-project-schema";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import slugify from "slugify";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const NewProjectForm = () => {
  const createProject = useMutation(api.projects_mutations.createProject);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      iconName: "None",
      description: "",
      template: "Default",
      visibility: "Private",
    },
  });

  const title = form.watch("title");

  const generateSlug = (text: string) => {
    return slugify(text, {
      lower: true,
      strict: true,
      trim: true,
    });
  };

  useEffect(() => {
    const newSlug = generateSlug(title);
    form.setValue("slug", newSlug);
  }, [title, form]);

  const onCreate = (values: z.infer<typeof createProjectSchema>) => {
    setIsLoading(true);

    const promise = createProject(values)
      .then((projectId) => {
        router.push(`/projects/${projectId}/${values.slug}`);
      })
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      success: "Project created successfully.",
      error: "Project creation failed.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-8 items-stretch">
          <Card className="rounded-none h-full">
            <CardHeader className="flex items-center gap-x-4">
              <Info className="w-5 h-5" />
              <p className="font-bold text-lg">Basic Information</p>
            </CardHeader>

            <Separator />

            <CardContent className="flex-col space-y-4">
              <Label className="font-medium text-base">
                Documentation Title
              </Label>

              <CardDescription>
                This is the title of your documentation. Make it clear and
                concise.
              </CardDescription>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Hydemary's Documentation"
                        className="rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardContent className="flex-col space-y-4">
              <Label className="font-medium text-base">
                Documentation Slug
              </Label>

              <CardDescription>
                This is the slug of your documentation. It will be generated
                automatically from your title.
              </CardDescription>

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="hydemarys-documentation"
                        className="rounded-sm"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardContent className="flex-col space-y-4">
              <Label className="font-medium text-base">
                Documentation Description
              </Label>

              <CardDescription>
                Provide a description for your documentation. This makes it
                easier for you to identify similar documentations.
              </CardDescription>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Hydemary's Documentation for Docufy."
                        className="rounded-sm min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-4 h-full">
            <Card className="rounded-none flex-1 flex flex-col">
              <CardHeader className="flex items-center gap-x-4">
                <Palette className="w-5 h-5" />
                <p className="font-bold text-lg">Basic Appearance</p>
              </CardHeader>

              <Separator />

              <CardContent className="flex-col space-y-4">
                <Label className="font-medium text-base">
                  Documentation Icon
                </Label>

                <CardDescription>
                  Choose an icon that best represents your project.
                </CardDescription>

                <FormField
                  control={form.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full hover:cursor-pointer">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent className="font-bold">
                            <SelectItem
                              value="Rocket"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <Rocket className="!h-4 !w-4" /> Rocket
                                Experience
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="Book"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <Book className="!h-4 !w-4" /> Book Collection
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="Code"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <Code className="!h-4 !w-4" /> Code Instance
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="File"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <File className="!h-4 !w-4" />
                                Document Entry
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="Presentation"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <Presentation className="!h-4 !w-4" />
                                Presentation View
                              </div>
                            </SelectItem>
                            <SelectSeparator />
                            <SelectItem
                              value="None"
                              className="hover:cursor-pointer"
                            >
                              <div className="flex items-center gap-2 h-8">
                                <MinusCircle className="!h-4 !w-4" /> Empty Icon
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="rounded-none flex-1 flex flex-col">
              <CardHeader className="flex items-center gap-x-4">
                <Eye className="w-5 h-5" />
                <p className="font-bold text-lg">Project Visibility</p>
              </CardHeader>

              <Separator />

              <CardContent className="flex-col space-y-4">
                <Label className="font-medium text-base">
                  Documentation Visibility
                </Label>

                <CardDescription>
                  Choose project&apos;s visibility. Public means it will be
                  published to the world automatically.
                </CardDescription>

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          className="flex items-center justify-evenly w-full"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <ToggleGroupItem
                            value="Private"
                            className="flex-grow !rounded-none hover:cursor-pointer"
                            variant="outline"
                          >
                            <Lock className="!h-5 !w-5 mr-2" />
                            Private Project
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Public"
                            className="flex-grow !rounded-none hover:cursor-pointer"
                            variant="outline"
                          >
                            <Globe className="!h-5 !w-5 mr-2 !rounded-none" />
                            Public Project
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="rounded-none flex-1 flex flex-col">
              <CardHeader className="flex items-center gap-x-4">
                <PlusCircle className="w-5 h-5" />
                <p className="font-bold text-lg">Create Project</p>
              </CardHeader>

              <Separator />

              <CardContent className="w-full h-full flex items-end justify-between">
                <Button
                  className="hover:cursor-pointer rounded-sm"
                  variant={"outline"}
                  onClick={() => router.push("/")}
                  type="reset"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5" />
                  Cancel Project
                </Button>
                <Button
                  className="hover:cursor-pointer rounded-sm"
                  type="submit"
                  disabled={isLoading}
                >
                  <PlusSquare className="w-5 h-5" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectForm;
