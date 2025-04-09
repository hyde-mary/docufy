"use client";

import { useState } from "react";
import EditorSidebar from "@/components/editor/editor-sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* hamburger button */}
      <Button
        variant={"outline"}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-background p-2 rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-[90px] bottom-4 left-4 z-40 w-96 bg-background overflow-y-auto transition-all duration-300">
          <EditorSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="h-full w-full">
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
