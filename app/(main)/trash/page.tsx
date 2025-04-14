import TrashHeader from "@/components/main/trash/trash-header";
import TrashProjectsView from "@/components/main/trash/trash-projects-view";

export default function TrashPage() {
  return (
    <div className="flex flex-col items-start justify-start p-6 space-y-4">
      <TrashHeader />
      <div className="w-full py-4 space-y-4">
        <h1 className="text-xl font-bold">Projects for Deletion</h1>
        <TrashProjectsView />
      </div>
    </div>
  );
}
