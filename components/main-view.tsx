import { Doc } from "@/convex/_generated/dataModel";
import { ProjectsCard } from "@/components/main/projects-card";
import Link from "next/link";
import MainViewSkeleton from "./main-view-skeleton";

interface MainViewProps {
  projects: Doc<"projects">[];
}

const MainView = ({ projects }: MainViewProps) => {
  if (!projects) return <MainViewSkeleton />;

  return (
    <div className="flex flex-wrap items-start gap-6 py-4">
      {projects.map((project) => {
        let basePath = "/project"; // default path

        if (project.status === "Inactive") {
          basePath = "/archiveed";
        } else if (
          project.status === "Active" &&
          project.visibility === "Public"
        ) {
          basePath = "/published";
        }

        return (
          <Link
            key={project._id}
            href={`${basePath}/${project._id}/${project.slug}`}
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
        );
      })}
    </div>
  );
};

export default MainView;
