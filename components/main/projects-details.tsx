"use client";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import ProjectDetailsContent from "./projects-details-content";
import { reorderProjectData } from "@/utils/reorder-project-data";
import ProjectDetailsInformation from "@/components/main/projects-details-information";
import ProjectDetailsActions from "./projects-details-actions";
import { useEditorStore } from "@/stores/editor-store/index";
import { useEffect } from "react";
import EditableProjectTitle from "./projects/editable-project-title";
import EditableProjectIcon from "./projects/editable-project-icon";

const ProjectDetails = () => {
  const { id, slug } = useParams();
  const { setData } = useEditorStore();
  const router = useRouter();

  const project = useQuery(api.projects_queries.getProjectById, {
    id: id as Id<"projects">,
  });

  useEffect(() => {
    if (project?.data) {
      setData(project?.data);
    }
  }, [project?.data, setData]);

  useEffect(() => {
    if (!project || !project.slug) return;
    const correctPath = `/projects/${project._id}/${project.slug}`;
    if (slug !== project.slug) {
      router.replace(correctPath);
    }
  }, [project, slug, router]);

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
      {/* Header */}
      <div className="w-full">
        {project.iconName === "None" && (
          <div className="mb-2 flex justify-start">
            <EditableProjectIcon
              initialIcon={project.iconName}
              projectId={project._id}
            />
          </div>
        )}

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-x-2 flex-shrink min-w-0">
            {project.iconName !== "None" && (
              <EditableProjectIcon
                initialIcon={project.iconName}
                projectId={project._id}
              />
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              <EditableProjectTitle
                initialTitle={project.title}
                projectId={project._id}
              />
            </h1>
          </div>

          <div className="flex-shrink-0">
            {slug && project && (
              <ProjectDetailsActions
                username={project.username}
                visibility={project.visibility}
                status={project.status}
                projectId={project._id}
                slug={project.slug}
              />
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Project details information */}
      <ProjectDetailsInformation project={project} />

      {/* JSON Content */}
      <ProjectDetailsContent reorderData={data} />
    </div>
  );
};

export default ProjectDetails;
