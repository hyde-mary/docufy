"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { getLucideIcon } from "@/utils/components/get-lucide-icon";
import { useQuery } from "convex/react";
import {
  FolderIcon,
  Globe,
  HomeIcon,
  ChevronDown,
  ChevronRight,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarContent = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Projects: true,
  });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      setExpandedItems((prev) => ({ ...prev, Projects: true }));
    }
  }, [pathname]);

  const projects = useQuery(api.projects_queries.getActiveProjects);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isProjectActive = (projectId: string) => {
    const regex = new RegExp(`^/projects/${projectId}(/.*)?$`);
    return regex.test(pathname);
  };

  const isActive = (path: string, strict = false) => {
    return strict ? pathname === path : pathname.startsWith(path);
  };

  const getProjectLink = (project: {
    status: string;
    visibility: string;
    _id: string;
    slug: string;
  }) => {
    let basePath = "/projects";

    if (project.status === "Inactive") {
      basePath = "/archived";
    } else if (project.status === "Active" && project.visibility === "Public") {
      basePath = "/published";
    }

    return `${basePath}/${project._id}/${project.slug}`;
  };

  return (
    <nav className="space-y-2 p-3 w-full">
      {/* Home */}
      <Link
        href="/"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${
          isActive("/", true) ? "bg-muted-foreground/20" : ""
        }`}
      >
        <HomeIcon size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Home Page
        </span>
      </Link>

      {/* Projects */}
      <div className="flex flex-col">
        <button
          onClick={() => toggleExpand("Projects")}
          className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-muted-foreground/15 transition-colors hover:cursor-pointer`}
        >
          <div className="flex items-center space-x-3">
            <FolderIcon
              size={18}
              className="text-gray-800 dark:text-gray-200"
            />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Active Projects
            </span>
          </div>
          <span className="transition-transform duration-200">
            {expandedItems["Projects"] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        </button>

        {expandedItems["Projects"] && (
          <div className="mt-2 space-y-2 text-center">
            {projects === undefined ? (
              [1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-full rounded-md bg-muted-foreground/30 dark:bg-muted-foreground/30"
                />
              ))
            ) : projects.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">
                No active projects found.
              </div>
            ) : (
              projects.map((project) => (
                <Link
                  key={project._id}
                  href={getProjectLink(project)}
                  className={`block text-sm p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${
                    isProjectActive(project._id) ? "bg-muted-foreground/20" : ""
                  }`}
                >
                  <div className="flex gap-2 pl-6 truncate">
                    {getLucideIcon(project.iconName)}
                    <span>{project.title}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* archived */}
      <Link
        href="/archived"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/archived") ? "bg-muted-foreground/20" : ""}`}
      >
        <Archive size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Archived Projects
        </span>
      </Link>

      {/* Publish */}
      <Link
        href="/published"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/published") ? "bg-muted-foreground/20" : ""}`}
      >
        <Globe size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Published Projects
        </span>
      </Link>
    </nav>
  );
};

export default SidebarContent;
