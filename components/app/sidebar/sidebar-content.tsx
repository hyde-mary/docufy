import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import {
  File,
  FolderIcon,
  Globe,
  HomeIcon,
  Archive,
  TrashIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SidebarContent = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();
  const { user } = useUser();
  const projects = useQuery(
    api.projects.getProjectsByUser,
    user ? { userId: user.id } : "skip"
  );

  const isLoading = projects === undefined;

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <nav className="space-y-2 p-3 w-full">
      {/* Home */}
      <Link
        href="/"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/") ? "bg-muted-foreground/20" : ""}`}
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
          className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-muted-foreground/15 transition-colors hover:cursor-pointer ${isActive("/projects") ? "bg-muted-foreground/20" : ""}`}
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
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-full rounded-md bg-muted-foreground/30 dark:bg-muted-foreground/30"
                  />
                ))
              : projects?.map((project) => (
                  <Link
                    key={project._id}
                    href={`/projects/${project._id}`}
                    className={`block text-sm p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive(`/projects/${project._id}`) ? "bg-muted-foreground/20" : ""}`}
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {project.title}
                    </span>
                  </Link>
                ))}
          </div>
        )}
      </div>

      {/* Drafts */}
      <Link
        href="/drafts"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/drafts") ? "bg-muted-foreground/20" : ""}`}
      >
        <File size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Drafts
        </span>
      </Link>

      {/* Trash */}
      <Link
        href="/trash"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/trash") ? "bg-muted-foreground/20" : ""}`}
      >
        <TrashIcon size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Trash
        </span>
      </Link>

      {/* Archive */}
      <Link
        href="/archive"
        className={`flex items-center space-x-3 p-2 rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive("/archive") ? "bg-muted-foreground/20" : ""}`}
      >
        <Archive size={18} className="text-gray-800 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Archive
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
