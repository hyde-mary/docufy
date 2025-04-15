"use client";
import HomeHeader from "@/components/main/home/home-header";
import ProjectsView from "@/components/main/home/projects-view";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const projects = useQuery(api.projects_queries.getActiveProjects);

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4">
      <HomeHeader />
      <div className="w-full py-4 space-y-4">
        <h1 className="text-xl font-bold">Projects</h1>
        <ProjectsView projects={projects!} />
      </div>
    </div>
  );
}
