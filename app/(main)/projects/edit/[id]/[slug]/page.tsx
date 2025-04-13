import EditProjectForm from "@/components/main/projects/form/edit-project-form";
import { Separator } from "@/components/ui/separator";

const EditProjectPage = () => {
  return (
    <div className="px-6 py-12">
      <div className="flex flex-col items-start justify-start space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <h2 className="text-sm font-medium text-muted-foreground">
          Here you can edit the basic information for your project.
        </h2>
        <Separator />
        <div className="w-full">
          <EditProjectForm />
        </div>
      </div>
    </div>
  );
};

export default EditProjectPage;
