import DualSidebar from "@/components/app/dual-sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <DualSidebar />
      <main></main>
    </div>
  );
}
