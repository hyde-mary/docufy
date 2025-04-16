"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";

export default function PublishPage() {
  const projects = useQuery(api.projects_queries.getPublishedProjects);

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4">
      <MainViewHeader viewType="public" />
      <div className="w-full py-4 space-y-4">
        <h1 className="text-xl font-bold">Published Projects</h1>
        <MainView projects={projects!} />
      </div>
    </div>
  );
}
