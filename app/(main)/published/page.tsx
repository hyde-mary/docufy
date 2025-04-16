"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";

import { useState } from "react";

export default function PublishedPage() {
  const projects = useQuery(api.projects_queries.getProjects);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects?.filter((project) => {
    return (
      project.visibility === "Public" &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const isEmpty = (filteredProjects?.length ?? 0) === 0;

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4 h-full">
      <MainViewHeader viewType="public" setSearchQuery={setSearchQuery} />
      <div className="w-full py-4 space-y-4 h-full flex flex-col">
        <h1 className="text-xl font-bold">Published Projects</h1>
        <div className="flex flex-1">
          <MainView
            projects={filteredProjects!}
            showCreateCard={true}
            isEmpty={isEmpty}
          />
        </div>
      </div>
    </div>
  );
}
