"use client";
import HeaderSidebar from "./sidebar/sidebar-header";
import SidebarContent from "./sidebar/sidebar-content";
import SidebarFooter from "./sidebar/sidebar-footer";

export default function Sidebar() {
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
