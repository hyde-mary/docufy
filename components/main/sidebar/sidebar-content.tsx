"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { useQuery } from "convex/react";
import {
  FolderIcon,
  Globe,
  HomeIcon,
  ChevronDown,
  ChevronRight,
  Trash2,
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
          Home
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
              Projects
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
              <div className="text-sm text-muted-foreground">
                No projects found.
              </div>
            ) : (
              projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}/${project.slug}`}
                  className={`block text-sm p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${
                    isProjectActive(project._id) ? "bg-muted-foreground/20" : ""
                  }`}
                >
                  <div className="flex gap-2 pl-4 truncate">
                    {getLucideIcon(project.iconName)}
                    <span>{project.title}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* Trash */}
      <Link
        href="/trash"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/trash") ? "bg-muted-foreground/20" : ""}`}
      >
        <Trash2 size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Trash
        </span>
      </Link>

      {/* Publish */}
      <Link
        href="/publish"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/publish") ? "bg-muted-foreground/20" : ""}`}
      >
        <Globe size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Publish
        </span>
      </Link>
    </nav>
  );
};

export default SidebarContent;
