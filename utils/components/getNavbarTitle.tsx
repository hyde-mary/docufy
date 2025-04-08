import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";

export const getNavbarTitle = (pathname: string, project?: Project | null) => {
  if (pathname === "/") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Home</span>
      </div>
    );
  }

  if (pathname === "/projects/new") {
    return (
      <div className="flex items-center justify-cnter space-x-2 text-sm">
        <span>Projects</span>
        <ChevronRight size={18} />
        <span>Create a new project</span>
      </div>
    );
  }

  if (pathname.startsWith("/projects/")) {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>{project?.title || <Skeleton className="w-64 h-8" />}</span>
      </div>
    );
  }

  if (pathname === "/drafts") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Drafts</span>
      </div>
    );
  }

  if (pathname === "/trash") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Trash</span>
      </div>
    );
  }

  if (pathname === "/archive") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Archive</span>
      </div>
    );
  }

  if (pathname === "/publish") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Publish</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-sm">
      <span>Unknown Page</span>
    </div>
  );
};
