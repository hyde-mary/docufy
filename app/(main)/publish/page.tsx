import PublishHeader from "@/components/main/publish/publish-header";
import PublishProjectsView from "@/components/main/publish/publish-projects-view";

export default function PublishPage() {
  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4">
      <PublishHeader />
      <div className="w-full py-4 space-y-4">
        <h1 className="text-xl font-bold">Published Projects</h1>
        <PublishProjectsView />
      </div>
    </div>
  );
}
