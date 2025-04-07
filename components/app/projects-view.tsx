"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectsView = () => {
  const { user } = useUser();
  const projects = useQuery(
    api.projects.getProjectsByUser,
    user ? { userId: user.id } : "skip"
  );

  if (!projects) return <div className="p-6">Loading projects...</div>;

  const formatTimestamp = (timestamp: number) => {
    const creationTime = new Date(timestamp);
    return creationTime.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-8">
      {projects.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground">
          No projects found.
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col w-full max-w-md" // Adjusted width
          >
            <div className="bg-muted h-56 flex items-center justify-center">
              <FileText className="h-20 w-20 text-muted-foreground" />
            </div>

            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold line-clamp-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                Last edited: {formatTimestamp(project._creationTime)}
              </p>
            </div>

            <div className="border-t p-4 flex items-center justify-between bg-muted/10">
              <Button asChild variant="ghost" size="lg">
                <Link href={`/projects/${project._id}`}>Open</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="lg" className="h-10 w-10 p-0">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-3">
                    <Pencil className="h-5 w-5" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 text-destructive">
                    <Trash2 className="h-5 w-5" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsView;
