"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { useQuery } from "convex/react";
import { ArrowRight, ChevronRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectDetails = () => {
  const { id } = useParams();

  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );

  if (!project)
    return (
      <div className="flex flex-col gap-y-8">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-24" />
      </div>
    );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getLucideIcon(project.iconName, 24)}
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>
        <Link href={`/editor/${project._id}/${project.slug}`}>
          <Button
            variant={"outline"}
            className="hover:cursor-pointer px-4! py-0! h-7! text-xs"
          >
            Go to editor
            <ArrowRight className="w-2 h-2" />
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4">
        {/* Project Information */}
        <Card className="rounded-sm flex flex-col justify-center">
          <CardHeader className="flex items-center justify-start text-lg font-bold">
            Project Information
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-y-6">
            {/* description */}
            <h1 className="text-base font-medium text-muted-foreground">
              Project Description:
            </h1>
            <p
              className={cn(
                "text-sm text-justify line-clamp-4",
                !project.description && "italic"
              )}
            >
              {project.description
                ? project.description
                : "No Project Description"}
            </p>
          </CardContent>
          <Separator />
          <CardContent className="flex flex-col gap-y-6">
            {/* slug */}
            <h1 className="text-base font-medium text-muted-foreground">
              Project Slug:
            </h1>
            <p className="text-sm">
              Your project will be visible with the following slug. This is
              important when you publish your documentation:
            </p>
            <div className="flex items-center jsutify-center gap-x-4">
              <ChevronRight className="w-4 h-4" />
              <code className="px-4 bg-muted-foreground/10 rounded-md">
                {project.slug}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* bento */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-sm">
            <CardHeader className="flex items-center justify-start text-lg font-bold">
              Project Status
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col items-start justify-center space-y-2 h-full">
              <Badge
                className={cn(
                  "text-sm",
                  project.status === "Active"
                    ? "bg-green-800 text-gray-200"
                    : "bg-muted-foreground text-gray-800"
                )}
              >
                {project.status}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                {project.status === "Active"
                  ? "This project is currently active"
                  : "This project is not active"}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardHeader className="flex items-center justify-start text-lg font-bold">
              Project Visibility
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col items-start justify-center space-y-2 h-full">
              <div className="flex items-center gap-x-2">
                {project.visibility === "Public" ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                <p>{project.visibility}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {project.visibility === "Public"
                  ? "This project is visible to the world"
                  : "This project is only visible to you"}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardHeader className="flex items-center justify-start text-lg font-bold">
              Project Template
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col items-start justify-center space-y-2 h-full">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                  {project.template}
                </h2>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardHeader className="flex items-center justify-start text-lg font-bold">
              Creation Time
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col items-start justify-center space-y-2 h-full">
              <div>
                <p className="text-sm text-muted-foreground">
                  {new Date(project._creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader className="flex items-center justify-start text-lg font-bold">
          Project Content
        </CardHeader>
        <Separator />
        <CardContent>
          <CardDescription className="gap-y-8">
            Docufy uses a <code className="rounded-sm">json</code> format to
            store and display the content of your documentation. Below, you can
            see the full content of your documentation, starting from the
            different tabs, the headings, the links, and more.
            <br />
            <br />
            You can edit this as you deemed fit. You can also upload your own{" "}
            <code>json</code> file and it will be read by Docufy.
            <br />
            <br />
            Just ensure that the <code>json</code> file follows Docufy&apos;s
            own format!
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;
