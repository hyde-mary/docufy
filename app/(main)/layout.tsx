"use client";

import { Loader } from "@/components/loader";
import Navbar from "@/components/main/navbar";
import Sidebar from "@/components/main/sidebar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <Loader />;

  if (!isAuthenticated && !isLoading) {
    return redirect("/landing");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* this is for the mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed lg:relative left-0 top-0 h-screen w-64 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* main content */}
      <div className="flex-1 flex flex-col h-full">
        <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 z-40">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 pt-16 lg:pt-16 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
