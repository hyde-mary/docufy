"use client";

import { useState } from "react";
import EditorToolbar from "@/components/editor/editor-toolbar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLeft, setIsLeft] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* hamburger */}
      <Button
        variant={"outline"}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 z-50 bg-background p-2 rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer",
          isLeft ? "left-4" : "right-4"
        )}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Toolbar */}
      {isOpen && (
        <div
          className={`fixed top-[90px] bottom-4 z-40 w-96 bg-background overflow-y-auto transition-all duration-300 ${
            isLeft ? "left-4" : "right-4"
          }`}
        >
          <EditorToolbar setIsLeft={setIsLeft} isLeft={isLeft} />
        </div>
      )}

      {/* The main content goes here */}
      <div className="h-full w-full">
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
