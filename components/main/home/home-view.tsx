import { Doc } from "@/convex/_generated/dataModel";

import { ProjectsCard } from "@/components/main/projects-card";

import Link from "next/link";
import HomeViewSkeleton from "./home-view-skeleton";

interface ProjectsViewProps {
  projects: Doc<"projects">[];
}

const HomeView = ({ projects }: ProjectsViewProps) => {
  if (!projects) return <HomeViewSkeleton />;

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
