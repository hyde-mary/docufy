import Navbar from "@/components/app/navbar";
import Sidebar from "@/components/app/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full">
        <Navbar />
        <div className="flex items-center justify-start p-4"></div>
      </main>
    </div>
  );
}
