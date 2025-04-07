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
import React, { useState } from "react";

interface Project {
  _id: string;
  title: string;
}

interface SidebarContentProps {
  projects: Project[];
}

const SidebarContent = ({ projects }: SidebarContentProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();

  const items = [
    {
      title: "Home",
      icon: <HomeIcon size={18} />,
      path: "/",
    },
    {
      title: "Projects",
      icon: <FolderIcon size={18} />,
      subItems: [
        ...projects.map((project) => ({
          title: project.title,
          path: `/projects/${project._id}`,
        })),
      ],
    },
    {
      title: "Drafts",
      icon: <File size={18} />,
      path: "/drafts",
    },
    {
      title: "Trash",
      icon: <TrashIcon size={18} />,
      path: "/trash",
    },
    {
      title: "Archive",
      icon: <Archive size={18} />,
      path: "/archive",
    },
    {
      title: "Publish",
      icon: <Globe size={18} />,
      path: "/publish",
    },
  ];

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Function to check if a given path is active
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <nav className="space-y-2 p-3 w-full">
      {items.map((item) => (
        <div key={item.title} className="group">
          <div className="flex flex-col">
            <button
              onClick={() => item.subItems && toggleExpand(item.title)}
              className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-muted-foreground/15 transition-colors hover:cursor-pointer ${isActive(item.path!) ? "bg-muted-foreground/20" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-800 dark:text-gray-200">
                  {item.icon}
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.title}
                </span>
              </div>

              {item.subItems && (
                <span className="transition-transform duration-200">
                  {expandedItems[item.title] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              )}
            </button>

            {item.subItems && expandedItems[item.title] && (
              <div className="mt-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className={`flex items-center justify-center space-x-3 p-2 text-sm rounded-md hover:bg-muted-foreground/15 transition-colors ${isActive(subItem.path) ? "bg-muted-foreground/20" : ""}`}
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {subItem.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SidebarContent;
