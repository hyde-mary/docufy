import { ChevronRight, Loader } from "lucide-react";
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

  if (pathname === "/projects/create") {
    return (
      <div className="flex items-center justify-cnter space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Projects</span>
        <ChevronRight size={18} />
        <span>Create Project</span>
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

  if (pathname === "/archived") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Archived</span>
      </div>
    );
  }

  if (pathname.startsWith("/archived/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Archived</span>
        <ChevronRight size={18} />
        <span>{slug || <Skeleton className="w-32 h-4" />}</span>
      </div>
    );
  }

  if (pathname === "/published") {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>Docufy</span>
        <ChevronRight size={18} />
        <span>Published</span>
      </div>
    );
  }

  if (pathname.startsWith("/published/")) {
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
      <span>Docufy</span>
      <ChevronRight size={18} />
      <span>Unknown Page</span>
      <Loader size={18} />
    </div>
  );
};
