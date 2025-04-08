import Navbar from "@/components/main/navbar";
import Sidebar from "@/components/main/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
