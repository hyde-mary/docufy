"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";

export default function ArchivePage() {
  const projects = useQuery(api.projects_queries.getInactiveProjects);

  const isEmpty = (projects?.length ?? 0) === 0;

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4 h-full">
      <MainViewHeader viewType="project" />
      <div className="w-full py-4 space-y-4 h-full flex flex-col">
        <h1 className="text-xl font-bold">Archived Projects</h1>
        <div className="flex flex-1">
          <MainView
            projects={projects!}
            isEmpty={isEmpty}
            showCreateCard={false}
          />
        </div>
      </div>
    </div>
  );
}
