"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { useMutation, useQuery } from "convex/react";
import {
  Archive,
  ArrowRight,
  Globe,
  Lock,
  MoreHorizontal,
  Pen,
  RefreshCcw,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ProjectDetailsContent from "./project-details-content";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { reorderProjectData } from "@/utils/reorder-project-data";

import ProjectDetailsInformation from "@/components/main/project-details-information";

const ProjectDetails = () => {
  const { id } = useParams();

  const project = useQuery(api.projects_queries.getProjectById, {
    id: id as Id<"projects">,
  });

  const moveProjectToTrash = useMutation(api.projects.moveProjectToTrash);
  const publishProject = useMutation(api.projects.publishProject);

  const [isTrashing, setIsTrashing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  if (!project) {
    return (
      <div className="flex flex-col gap-y-8">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  const data = reorderProjectData(project.data);

  const handleProjectToTrash = (projectId: Id<"projects">) => {
    setIsTrashing(true);
    try {
      moveProjectToTrash({ projectId });
      toast.success("Successfully moved the project to trash");
      router.push("/");
    } catch (error) {
      toast.error("Error moving project to trash", {
        description: error as string,
      });
    } finally {
      setIsTrashing(false);
    }
  };

  const handlePublishProject = (projectId: Id<"projects">) => {
    setIsPublishing(true);
    try {
      publishProject({ projectId });
      toast.success("Successfully published the project");
      router.push("/publish");
    } catch (error) {
      toast.error("Error publishing your project", {
        description: error as string,
      });
    } finally {
      setIsPublishing(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getLucideIcon(project.iconName, 24)}
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>
        {project.visibility !== "Public" && project.status === "Active" && (
          <div className="flex items-center gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:cursor-pointer">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="gap-x-4 hover:cursor-pointer"
                  onClick={() =>
                    router.push(`/projects/edit/${project._id}/${project.slug}`)
                  }
                >
                  <Pen className="w-4 h-4" />
                  Edit Project
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={cn(
                    "gap-x-4 hover:cursor-pointer",
                    isTrashing && "bg-gray-500"
                  )}
                  onClick={() => handleProjectToTrash(project._id)}
                  disabled={isTrashing || isPublishing}
                >
                  <Archive className="w-4 h-4" />
                  {isTrashing || isPublishing
                    ? "Archive Project"
                    : "Archive Project"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="gap-x-4 hover:cursor-pointer"
                  onClick={() => handlePublishProject(project._id)}
                  disabled={isTrashing || isPublishing}
                >
                  <Globe className="w-4 h-4" />
                  {isTrashing || isPublishing
                    ? "Publishing Project"
                    : "Publish Project"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/editor/${project._id}/${project.slug}`}>
              <Button variant="outline" className="hover:cursor-pointer">
                Go to editor
                <ArrowRight className="w-2 h-2" />
              </Button>
            </Link>
          </div>
        )}

        {project.visibility !== "Public" && project.status === "Inactive" && (
          <div className="flex items-center justify-center gap-x-4">
            <Button className="hover:cursor-pointer" variant={"default"}>
              <RefreshCcw className="w-4 h-4" />
              Restore Project
            </Button>
            <Button className="hover:cursor-pointer" variant={"destructive"}>
              <Trash className="w-4 h-4" />
              Delete Project
            </Button>
          </div>
        )}

        {project.visibility === "Public" && (
          <div className="flex items-center justify-center gap-x-4">
            <Button className="hover:cursor-pointer" variant={"secondary"}>
              <Lock className="w-4 h-4" />
              Unpublish Project
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Main Content Grid */}
      <ProjectDetailsInformation project={project} />

      {/* JSON Content */}
      <ProjectDetailsContent reorderData={data} />
    </div>
  );
};

export default ProjectDetails;
