"use client";
import HeaderSidebar from "./sidebar/sidebar-header";
import SidebarContent from "./sidebar/sidebar-content";
import SidebarFooter from "./sidebar/sidebar-footer";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const projectSlugMatch = pathname.match(/^\/projects\/[^/]+\/([^/]+)/);
  const projectSlug = projectSlugMatch ? projectSlugMatch[1] : null;
  console.log(projectSlug);

  return (
    <div className="flex flex-col h-screen w-64 border-r border-muted-foreground/30">
      {/* header */}
      <div className="flex items-center w-full p-2 border-b border-muted-foreground/30 h-16 max-h-16">
        <HeaderSidebar />
      </div>

      {/* main sidebar content */}
      <div className="w-full flex flex-grow">
        <SidebarContent />
      </div>

      {/* footer */}
      <div className="w-full border-t border-muted-foreground/30 p-2">
        <SidebarFooter />
      </div>
    </div>
  );
}
