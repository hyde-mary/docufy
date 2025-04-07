import Sidebar from "@/components/app/sidebar";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main></main>
    </div>
  );
}
