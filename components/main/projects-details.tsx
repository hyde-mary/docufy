"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getLucideIcon } from "@/utils/components/get-lucide-icon";
import { useQuery } from "convex/react";

import { useParams } from "next/navigation";
import ProjectDetailsContent from "./projects-details-content";
import { reorderProjectData } from "@/utils/reorder-project-data";

import ProjectDetailsInformation from "@/components/main/projects-details-information";
import ProjectDetailsActions from "./projects-details-actions";
import { useEditorStore } from "@/stores/editor-store";
import { useEffect } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { setData } = useEditorStore();

  const project = useQuery(api.projects_queries.getProjectById, {
    id: id as Id<"projects">,
  });

  useEffect(() => {
    if (project?.data) {
      setData(project?.data);
    }
  }, [project?.data, setData]);

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

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getLucideIcon(project.iconName, 24)}
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>

        <ProjectDetailsActions
          username={project.username}
          visibility={project.visibility}
          status={project.status}
          projectId={project._id}
          slug={project.slug}
        />
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
