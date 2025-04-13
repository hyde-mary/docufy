import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

const ProjectDetailsInformation = ({
  description,
  slug,
}: {
  description: string;
  slug: string;
}) => {
  return (
    <Card className="col-span-2 rounded-none">
      <CardHeader className="text-lg font-bold">Project Information</CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-6">
          <h1 className="text-base font-medium text-muted-foreground">
            Project Description
          </h1>
          <p
            className={cn(
              "text-sm text-justify",
              !description && "italic text-muted-foreground"
            )}
          >
            {description || "No Project Description"}
          </p>
        </div>
        <Separator />
        <div className="space-y-6">
          <h2 className="text-base font-medium text-muted-foreground">
            Project Slug:
          </h2>
          <p className="text-sm">
            Your project will be visible with the following slug:
          </p>
          <code className="px-3 py-1 bg-muted rounded-md text-sm font-mono">
            {slug}
          </code>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsInformation;
