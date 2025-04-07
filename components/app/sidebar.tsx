"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import HeaderSidebar from "./sidebar/sidebar-header";
import SidebarContent from "./sidebar/sidebar-content";
import SidebarFooter from "./sidebar/sidebar-footer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Sidebar() {
  const { user, isLoaded } = useUser();
  const { openUserProfile, signOut } = useClerk();

  const projects = useQuery(
    api.projects.getProjectsByUser,
    user ? { userId: user.id } : "skip"
  );

  // Handle loading states
  if (!isLoaded) return null;
  if (!user) return null;

  return (
    <div className="flex flex-col h-screen w-64 border-r border-muted-foreground/30">
      {/* header */}
      <div className="w-full p-2 border-b border-muted-foreground/30">
        <HeaderSidebar
          user={user}
          openUserProfile={openUserProfile}
          signOut={signOut}
        />
      </div>

      {/* main sidebar content */}
      <div className="w-full flex flex-grow">
        <SidebarContent projects={projects ?? []} />
      </div>

      {/* footer */}
      <div className="w-full border-t border-muted-foreground/30 p-2">
        <SidebarFooter />
      </div>
    </div>
  );
}
