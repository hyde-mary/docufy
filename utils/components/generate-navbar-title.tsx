import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const generateNavbarTitle = (pathname: string) => {
  if (pathname === "/") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Home</span>
      </div>
    );
  }

  if (pathname === "/projects/new") {
    return (
      <div className="flex items-center justify-cnter space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Projects</span>
        <ChevronRight size={18} />
        <span>Create a new project</span>
      </div>
    );
  }

  if (pathname.startsWith("/projects/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Projects</span>
        <ChevronRight size={18} />
        <span>{slug || <Skeleton className="w-32 h-4" />}</span>
      </div>
    );
  }

  if (pathname === "/drafts") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Drafts</span>
      </div>
    );
  }

  if (pathname === "/archive") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Archive</span>
      </div>
    );
  }

  if (pathname.startsWith("/archive/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Archive</span>
        <ChevronRight size={18} />
        <span>{slug || <Skeleton className="w-32 h-4" />}</span>
      </div>
    );
  }

  if (pathname === "/publish") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Publish</span>
      </div>
    );
  }

  if (pathname.startsWith("/publish/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Published</span>
        <ChevronRight size={18} />
        <span>{slug || <Skeleton className="w-32 h-4" />}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-sm">
      <span>Unknown Page</span>
    </div>
  );
};
