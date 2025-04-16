"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";

interface MainViewEmptyProps {
  pathname: string; // maybe we render different texts based on where it is being viewed
}

export default function MainViewEmpty({ pathname }: MainViewEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-y-2">
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-md"></div>
        <div className="relative flex items-center justify-center w-24 h-24 bg-background rounded-lg border border-muted">
          <Rocket className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {pathname === "/home" || (pathname === "/" && <p>No Projects Found</p>)}
        {pathname === "/archived" && <p>No Archived Projects Found</p>}
        {pathname === "/published" && <p>No Published Projects Found</p>}
      </h2>

      {pathname !== "/archived" && (
        <p className="text-muted-foreground max-w-md mb-6">
          You don&apos;t have any active projects yet. Create your first project
          to get started on your journey!
        </p>
      )}

      {pathname === "/archived" && (
        <p className="text-muted-foreground max-w-md">
          Your archived projects will appear here. You can view them here!
        </p>
      )}

      {pathname !== "/archived" && (
        <div className="flex gap-4">
          <Button asChild variant="default" size="lg">
            <Link href="/projects/create">
              <Rocket className="mr-2 h-4 w-4" />
              Create First Project
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-8 opacity-75">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 w-full rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50"
          />
        ))}
      </div>
    </div>
  );
}
