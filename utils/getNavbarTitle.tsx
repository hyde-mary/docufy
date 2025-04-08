import { Home, FileArchive, Trash2, FolderOpen, Globe } from "lucide-react";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";

export const getNavbarTitle = (pathname: string, project?: Project | null) => {
  if (pathname === "/") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Home size={18} />
        <span>Home</span>
      </div>
    );
  }

  if (pathname.startsWith("/projects/")) {
    return (
      <div className="flex items-center justify-center space-x-2">
        {project?.iconName ? getLucideIcon(project.iconName) : null}
        <span>{project?.title || <Skeleton className="w-64 h-8" />}</span>
      </div>
    );
  }

  if (pathname === "/drafts") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <FileArchive size={18} />
        <span>Drafts</span>
      </div>
    );
  }

  if (pathname === "/trash") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Trash2 size={18} />
        <span>Trash</span>
      </div>
    );
  }

  if (pathname === "/archive") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <FolderOpen size={18} />
        <span>Archive</span>
      </div>
    );
  }

  if (pathname === "/publish") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Globe size={18} />
        <span>Publish</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <span>Unknown Page</span>
    </div>
  );
};
