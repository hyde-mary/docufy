import { Doc } from "@/convex/_generated/dataModel";
import { ProjectsCard } from "@/components/main/projects-card";
import Link from "next/link";
import MainViewSkeleton from "./main-view-skeleton";
import MainViewEmpty from "./main-view-empty";
import { ProjectsCreateCard } from "./main/projects-create-card";
import { usePathname } from "next/navigation";

interface MainViewProps {
  projects: Doc<"projects">[];
  isEmpty?: boolean;
  showCreateCard?: boolean;
}

const MainView = ({ projects, isEmpty, showCreateCard }: MainViewProps) => {
  const pathname = usePathname();

  if (!projects) return <MainViewSkeleton />;

  if (projects.length === 0 && isEmpty) {
    return (
      <div className="flex items-center justify-center w-full">
        <MainViewEmpty pathname={pathname} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-6 py-4">
      {showCreateCard && pathname !== "/archived" && <ProjectsCreateCard />}
      {projects.map((project) => {
        let basePath = "/projects"; // default path

        if (project.status === "Inactive") {
          basePath = "/archived";
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
