import Navbar from "@/components/app/navbar";
import ProjectsView from "@/components/app/projects-view";
import Sidebar from "@/components/app/sidebar";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full">
        <Navbar />
        <div className="flex items-center justify-start p-4">
          <ProjectsView />
        </div>
      </main>
    </div>
  );
}
