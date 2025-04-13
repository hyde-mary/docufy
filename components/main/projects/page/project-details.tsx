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
import { useQuery } from "convex/react";
import { ArrowRight, Globe, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProjectDetailsContent from "../project-details/project-details-content";
import ProjectDetailsInformation from "../project-details/project-details-information";
import ProjectDetailsStatus from "../project-details/project-details-status";
import ProjectDetailsVisibility from "../project-details/project-details-visibility";
import ProjectDetailsTemplate from "../project-details/project-details-template";
import ProjectDetailsTime from "../project-details/project-details-time";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );

  if (!project) {
    return (
      <div className="flex flex-col gap-y-8">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  const reorderData = {
    title: project.data.title,
    navLinks: project.data.navLinks,
    theme_toggle: project.data.theme_toggle,
    socials: project.data.socials,
    sections: project.data.sections,
    params: project.data.params,
    rootPage: project.data.rootPage,
    pages: project.data.pages,
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getLucideIcon(project.iconName, 24)}
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="hover:cursor-pointer !px-2 !py-0 h-7 text-xs"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-x-4 hover:cursor-pointer">
                <Trash className="w-4 h-4" />
                Move Project to Trash
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-x-4 hover:cursor-pointer">
                <Globe className="w-4 h-4" />
                Publish Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={`/editor/${project._id}/${project.slug}`}>
            <Button
              variant="outline"
              className="hover:cursor-pointer px-4! py-0! h-7! text-xs"
            >
              Go to editor
              <ArrowRight className="w-2 h-2" />
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Main Content Grid */}
      <div className="grid grid-cols-4 gap-4">
        <ProjectDetailsInformation
          description={project.description}
          slug={project.slug}
        />

        <div className="grid grid-cols-2 col-span-2 gap-4">
          <ProjectDetailsStatus status={project.status} />

          <ProjectDetailsVisibility visibility={project.visibility} />

          <ProjectDetailsTemplate template={project.template} />

          <ProjectDetailsTime creationTime={project._creationTime} />
        </div>
      </div>

      {/* JSON Content */}
      <ProjectDetailsContent reorderData={reorderData} />
    </div>
  );
};

export default ProjectDetails;
