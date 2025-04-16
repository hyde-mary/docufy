"use client";
import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Home() {
  const projects = useQuery(api.projects_queries.getProjects);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrivateProjects = projects?.filter(
    (project) =>
      project.status === "Active" &&
      project.visibility === "Private" &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPublicProjects = projects?.filter(
    (project) =>
      project.status === "Active" &&
      project.visibility === "Public" &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isEmpty =
    (filteredPrivateProjects?.length ?? 0) === 0 &&
    (filteredPublicProjects?.length ?? 0) === 0;

  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4 h-full">
      <MainViewHeader viewType="project" setSearchQuery={setSearchQuery} />
      <div className="w-full py-4 space-y-4 h-full flex flex-col">
        <h1 className="text-xl font-bold">Active Projects</h1>

        <div className="flex flex-1">
          <MainView
            projects={filteredPrivateProjects!}
            isEmpty={isEmpty}
            showCreateCard={true}
          />
        </div>

        {filteredPublicProjects && filteredPublicProjects.length > 0 && (
          <>
            <Separator />

            <div className="w-full py-4 space-y-4">
              <h1 className="text-xl font-bold">Published Projects</h1>
              <MainView
                projects={filteredPublicProjects!}
                isEmpty={isEmpty}
                showCreateCard={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
