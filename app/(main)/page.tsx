"use client";
import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const projects = useQuery(api.projects_queries.getActiveProjects);

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4">
      <MainViewHeader viewType="project" />
      <div className="w-full py-4 space-y-4">
        <h1 className="text-xl font-bold">Projects</h1>
        <MainView projects={projects!} />
      </div>
    </div>
  );
}
