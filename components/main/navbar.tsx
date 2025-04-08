"use client";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { Id } from "@/convex/_generated/dataModel";

const Navbar = () => {
  const { id } = useParams() as { id: string };
  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );

  return (
    <div className="flex items-center justify-start gap-2 px-6 h-16 max-h-16 border-b border-muted-foreground/30 w-full">
      {project && getLucideIcon(project.iconName)}
      <h1 className="text-xl font-bold">{project?.title || "Loading..."}</h1>
    </div>
  );
};

export default Navbar;
