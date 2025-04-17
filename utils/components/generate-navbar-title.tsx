import { ChevronRight, Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const generateNavbarTitle = (pathname: string) => {
  const common = (
    <>
      <span className="shrink-0">Docufy</span>
      <ChevronRight size={18} className="shrink-0" />
    </>
  );

  if (pathname === "/") {
    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="truncate">Home</span>
      </div>
    );
  }

  if (pathname === "/projects/create") {
    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="shrink-0">Projects</span>
        <ChevronRight size={18} className="shrink-0" />
        <span className="truncate">Create Project</span>
      </div>
    );
  }

  if (pathname.startsWith("/projects/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="shrink-0">Projects</span>
        <ChevronRight size={18} className="shrink-0" />
        <span className="truncate">
          {slug || <Skeleton className="w-32 h-4" />}
        </span>
      </div>
    );
  }

  if (pathname === "/archived") {
    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="truncate">Archived</span>
      </div>
    );
  }

  if (pathname.startsWith("/archived/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="shrink-0">Archived</span>
        <ChevronRight size={18} className="shrink-0" />
        <span className="truncate">
          {slug || <Skeleton className="w-32 h-4" />}
        </span>
      </div>
    );
  }

  if (pathname === "/published") {
    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="truncate">Published</span>
      </div>
    );
  }

  if (pathname.startsWith("/published/")) {
    const parts = pathname.split("/");
    const slug = parts[3];

    return (
      <div className="flex items-center space-x-2 text-sm min-w-0">
        {common}
        <span className="shrink-0">Published</span>
        <ChevronRight size={18} className="shrink-0" />
        <span className="truncate">
          {slug || <Skeleton className="w-32 h-4" />}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm min-w-0">
      {common}
      <span className="truncate">Unknown Page</span>
      <Loader size={18} className="shrink-0" />
    </div>
  );
};
