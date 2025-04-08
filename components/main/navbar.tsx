"use client";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getNavbarTitle } from "@/utils/components/getNavbarTitle";

const Navbar = () => {
  const pathname = usePathname();
  const { id } = useParams() as { id: string };

  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );

  return (
    <div className="flex items-center justify-start gap-2 px-6 h-16 max-h-16 border-b border-muted-foreground/30 w-full bg-background">
      <h1 className="text-xl font-bold">{getNavbarTitle(pathname, project)}</h1>
    </div>
  );
};

export default Navbar;
