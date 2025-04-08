import NewProjectsForm from "@/components/main/projects/new-projects-form";
import { Separator } from "@/components/ui/separator";
import React from "react";

const NewProjectPage = () => {
  return (
    <div className="px-6 py-12">
      <div className="flex flex-col items-start justify-start space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Create a new project</h1>
        <h2 className="text-sm font-medium text-muted-foreground">
          A project is everything in Docufy. A project refers to a documentation
          which you can edit, configure, and publish.
        </h2>
        <Separator />
        <div className="w-full">
          <NewProjectsForm />
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
