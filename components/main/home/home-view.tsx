import { Doc } from "@/convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProjectsCard } from "@/components/main/projects-card";

import Link from "next/link";

interface ProjectsViewProps {
  projects: Doc<"projects">[];
}

const HomeView = ({ projects }: ProjectsViewProps) => {
  if (!projects)
    return (
      <div className="flex items-center justify-start py-4 gap-8 flex-wrap">
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Separator />
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
          href={`/projects/${project._id}/${project.slug}`}
        >
          <ProjectsCard
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

export default HomeView;
