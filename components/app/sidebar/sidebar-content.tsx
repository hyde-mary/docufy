import {
  File,
  FolderIcon,
  Globe,
  HomeIcon,
  Rocket,
  Archive,
  TrashIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import React, { useState } from "react";

const SidebarContent = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const items = [
    {
      title: "Home",
      icon: <HomeIcon size={18} />,
      path: "/home",
    },
    {
      title: "Projects",
      icon: <FolderIcon size={18} />,
      subItems: [
        {
          title: "Getting Started",
          icon: <Rocket size={18} />,
          path: "/projects/getting-started",
        },
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

  return (
    <nav className="space-y-2 p-3 w-full">
      {items.map((item) => (
        <div key={item.title} className="group">
          <div className="flex flex-col">
            <button
              onClick={() => item.subItems && toggleExpand(item.title)}
              className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-muted-foreground/15 transition-colors hover:cursor-pointer`}
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
                  <a
                    key={subItem.path}
                    href={subItem.path}
                    className="flex items-center justify-center space-x-3 p-2 text-sm rounded-md hover:bg-muted-foreground/15 transition-colors"
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {subItem.icon}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {subItem.title}
                    </span>
                  </a>
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
