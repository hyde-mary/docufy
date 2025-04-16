"use client";
import MainView from "@/components/main-view";
import MainViewHeader from "@/components/main-view-header";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Home() {
  const projects = useQuery(api.projects_queries.getActiveProjects);
  const [searchQuery, setSearchQuery] = useState(""); // pass to the main-view-header to filter projects

  // private and public projects filter. Only for home view
  const privateProjects = projects?.filter(
    (project) => project.visibility === "Private"
  );
  const publicProjects = projects?.filter(
    (project) => project.visibility === "Public"
  );

  // search filter
  const filteredPrivateProjects = privateProjects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPublicProjects = publicProjects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isEmpty = (projects?.length ?? 0) === 0;

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

        {publicProjects && publicProjects.length > 0 && (
          <>
            <Separator />

            <div className="w-full py-4 space-y-4">
              <h1 className="text-xl font-bold">Public Projects</h1>
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
