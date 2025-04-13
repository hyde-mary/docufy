import NewProjectForm from "@/components/main/projects/form/new-project-form";
import { Separator } from "@/components/ui/separator";
import React from "react";

const NewProjectPage = () => {
  return (
    <div className="px-6 py-12">
      <div className="flex flex-col items-start justify-start space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Create a new project</h1>
        <h2 className="text-sm font-medium text-muted-foreground">
          In Docufy, a project is your workspace for creating documentation. You
          can edit content, configure settings, and publish it all in one place.
        </h2>
        <Separator />
        <div className="w-full">
          <NewProjectForm />
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
