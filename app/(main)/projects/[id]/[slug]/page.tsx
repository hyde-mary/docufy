import ProjectDetails from "@/components/main/projects-details";

export default function ProjectPage() {
  return (
    <div className="flex justify-center p-2 md:p-4 min-h-screen">
      <div className="container pt-24 md:pt-48 pb-12 md:pb-24 w-full">
        <ProjectDetails />
      </div>
    </div>
  );
}
