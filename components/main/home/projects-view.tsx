"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ProjectsViewCard } from "./projects-view-card";

const ProjectsView = () => {
  const { user } = useUser();

  const projects = useQuery(
    api.projects.getProjectsByUser,
    user ? { userId: user.id } : "skip"
  );

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
        <ProjectsViewCard
          key={project._id}
          iconName={project.iconName}
          title={project.title}
          status={project.status}
          description={project.description}
          _creationTime={project._creationTime}
        />
      ))}
    </div>
  );
};

export default ProjectsView;
