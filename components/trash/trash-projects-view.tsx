"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { Skeleton } from "../ui/skeleton";
import { TrashProjectsViewCard } from "./trash-projects-view-card";

type ProjectsData = FunctionReturnType<
  typeof api.projects.getUserTrashProjects
>;

const TrashProjectsView = () => {
  const { user } = useUser();

  const projects = useQuery(
    api.projects.getUserTrashProjects,
    user ? { userId: user.id } : "skip"
  ) as ProjectsData | undefined;

  if (!user || !projects)
    return (
      <div className="flex items-center justify-start py-4 gap-8">
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
      </div>
    );

  return (
    <div className="flex flex-wrap items-start gap-6 py-4">
      {projects.map((project) => (
        <TrashProjectsViewCard
          key={project._id}
          projectId={project._id}
          iconName={project.iconName}
          title={project.title}
          slug={project.slug}
          status={project.status}
          description={project.description}
          visibility={project.visibility}
          _creationTime={project._creationTime}
        />
      ))}
    </div>
  );
};

export default TrashProjectsView;
