"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { Skeleton } from "@/components/ui/skeleton";
import { PublishProjectsViewCard } from "./publish-projects-view-card";
import Link from "next/link";

type ProjectsData = FunctionReturnType<
  typeof api.projects.getUserTrashProjects
>;

const PublishProjectsView = () => {
  const { user } = useUser();

  const projects = useQuery(
    api.projects.getUserPublishProjects,
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
        <Link
          key={project._id}
          href={`/publish/${project._id}/${project.slug}`}
        >
          <PublishProjectsViewCard
            iconName={project.iconName}
            title={project.title}
            status={project.status}
            description={project.description}
            visibility={project.visibility}
            _creationTime={project._creationTime}
          />
        </Link>
      ))}
    </div>
  );
};

export default PublishProjectsView;
