"use client";

import { Loader } from "@/components/loader";
import Navbar from "@/components/main/navbar";
import Sidebar from "@/components/main/sidebar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) return <Loader />;

  if (!isAuthenticated && !isLoading) {
    return redirect("/landing");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed left-0 top-0 h-screen w-64 z-50">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64 h-full">
        <div className="fixed top-0 left-64 right-0 h-16 z-40">
          <Navbar />
        </div>

        <div className="flex-1 pt-16 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
