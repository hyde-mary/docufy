import { Doc } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Globe, Layout, Lock } from "lucide-react";

const ProjectDetailsInformation = ({
  project,
}: {
  project: Doc<"projects">;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Project Details Information Part */}
      <Card className="col-span-1 md:col-span-2 md:row-span-1 rounded-none">
        <CardHeader className="text-lg font-bold">
          Project Information
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <h1 className="text-base font-medium">Project Description</h1>
            <p
              className={cn(
                "text-sm text-justify",
                project.description && "italic text-muted-foreground"
              )}
            >
              {project.description || "No Project Description"}
            </p>
          </div>
          <Separator />
          <div className="space-y-6">
            <h2 className="text-base font-medium">
              {project.visibility === "Public" ? (
                <span>Project Link:</span>
              ) : (
                <span>Project Slug:</span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">
              {project.visibility === "Public" ? (
                <span>
                  Your project will be visible to the public using the link:
                </span>
              ) : (
                <span>
                  Your project will be visible with the following slug:
                </span>
              )}
            </p>

            {project.visibility === "Public" ? (
              <code className="px-3 py-1 bg-muted rounded-md text-sm font-mono break-all">
                {`/live/${project.username}/${project.slug}`}
              </code>
            ) : (
              <code className="px-3 py-1 bg-muted rounded-md text-sm font-mono break-all">
                {project.slug}
              </code>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 col-span-1 md:col-span-2 gap-4">
        {/* Project Status */}
        <Card className="rounded-none col-span-1">
          <CardHeader className="text-lg font-bold">Project Status</CardHeader>
          <Separator />
          <CardContent className="flex items-center justify-start gap-x-4 h-full">
            <Badge
              className={cn(
                "w-fit text-sm",
                project.status === "Active"
                  ? "bg-green-600"
                  : "bg-muted-foreground"
              )}
            >
              {project.status}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {project.status === "Active"
                ? "This project is Active"
                : "This project is Inactive"}
            </p>
          </CardContent>
        </Card>

        {/* Project Visibility  */}
        <Card className="rounded-none col-span-1">
          <CardHeader className="text-lg font-bold">
            Project Visibility
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-start items-center h-full">
            <h2 className="text-base font-medium flex items-center justify-center gap-x-4">
              {project.visibility === "Private" ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
              <span
                className={cn(
                  project.visibility === "Private"
                    ? "text-muted-freground"
                    : "text-blue-500 underline"
                )}
              >
                {project.visibility}
              </span>
            </h2>
          </CardContent>
        </Card>

        {/* Project Template */}
        <Card className="rounded-none col-span-1">
          <CardHeader className="flex items-center justify-start text-lg font-bold">
            Project Template
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col justify-center h-full">
            <h2 className="text-base font-medium text-muted-foreground flex items-center gap-x-4">
              <Layout className="w-4 h-4" />
              {project.template}
            </h2>
          </CardContent>
        </Card>

        {/* Creation Time */}
        <Card className="rounded-none col-span-1">
          <CardHeader className="flex items-center justify-start text-lg font-bold">
            Creation Time
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col justify-center items-start h-full">
            <p className="text-base text-muted-foreground flex items-center gap-x-4">
              <Clock className="w-4 h-4" />
              {new Date(project._creationTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsInformation;
