import NewProjectForm from "@/components/main/projects/new-project-form";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Info } from "lucide-react";
import React from "react";

const NewProjectPage = () => {
  return (
    <div className="px-6 py-12">
      <div className="flex flex-col items-start justify-start space-y-6 container mx-auto">
        <div className="flex items-center justify-center gap-x-4">
          <Bookmark />
          <h1 className="text-2xl font-bold">Create a new project</h1>
        </div>
        <h2 className="text-sm font-medium text-muted-foreground">
          In Docufy, a project is your workspace for creating documentation. You
          can edit content, configure settings, and publish it all in one place.
        </h2>

        <Separator />

        <div className="w-full">
          <NewProjectForm />
        </div>

        <div className="flex items-center gap-x-4 text-muted-foreground">
          <Info className="w-4 h-4" />
          <p className="text-base">
            When you create a project, you&apos;re agreeing to let Docufy store
            your project data on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
