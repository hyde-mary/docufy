"use client";
import { useState } from "react";
import { Home, Settings, Plus, ChevronRight } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import FooterDropdown from "./dual-sidebar/footer-dropdown";

const navItems = [
  { name: "Dashboard", icon: <Home size={18} /> },
  { name: "Settings", icon: <Settings size={18} /> },
];

export default function DualSidebar() {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const [active, setActive] = useState("Dashboard");
  const [expanded, setExpanded] = useState(true);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      {/* Primary Sidebar */}
      <div className="flex flex-col items-center gap-4 py-6 px-3 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`p-2 rounded-lg transition-all ${
              active === item.name
                ? "bg-primary/10 text-primary"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
            title={item.name}
          >
            {item.icon}
          </button>
        ))}

        <div className="mt-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <ChevronRight size={18} className={expanded ? "rotate-180" : ""} />
          </button>
        </div>
      </div>

      {/* Secondary Sidebar */}
      {expanded && (
        <div className="w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {active}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {active === "Documents" && (
              <div className="space-y-1">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-primary bg-primary/10">
                  <Plus size={16} />
                  New Document
                </button>
                <div className="mt-4 space-y-1">
                  {["Project Docs", "API Reference", "User Guide"].map(
                    (doc) => (
                      <div
                        key={doc}
                        className="px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        {doc}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {active === "Dashboard" && (
              <div className="text-sm text-gray-500 dark:text-gray-400 p-3">
                Overview of your documentation activity
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-zinc-800">
            <FooterDropdown
              user={user}
              openUserProfile={openUserProfile}
              signOut={signOut}
            />
          </div>
        </div>
      )}
    </div>
  );
}
