"use client";

import { Fragment, useState } from "react";
import EditorToolbar from "@/components/editor/editor-toolbar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EditorPageHeader from "@/components/editor/page/editor-page-header";
import EditorPageSidebar from "@/components/editor/page/editor-page-sidebar";
import EditorJsonViewer from "@/components/editor/editor-json-viewer";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const [isToolbarLeft, setIsToolbarLeft] = useState(true);
  const [isJsonOpen, setIsJsonOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* hamburger */}
      <Button
        variant={"outline"}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 z-50 bg-background p-2 rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer",
          isToolbarLeft ? "left-4" : "right-4"
        )}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Toolbar */}
      {isOpen && (
        <Fragment>
          <div
            className={`fixed top-[90px] bottom-4 z-40 w-[450px] bg-background overflow-y-auto transition-all duration-300 ${
              isToolbarLeft ? "left-4" : "right-4"
            }`}
          >
            <EditorToolbar
              setIsToolbarLeft={setIsToolbarLeft}
              isToolbarLeft={isToolbarLeft}
              isJsonOpen={isJsonOpen}
              setIsJsonOpen={setIsJsonOpen}
            />
          </div>
        </Fragment>
      )}

      {isJsonOpen && (
        <Fragment>
          {/* if the toolbar is left, we put it on the right, else we put it on the left. They would be inverse of each other */}
          <div
            className={`fixed top-[90px] bottom-4 z-40 w-[450px] bg-background overflow-y-auto transition-all duration-300 ${
              isToolbarLeft ? "right-4" : "left-4"
            }`}
          >
            <EditorJsonViewer
              setIsToolbarLeft={setIsToolbarLeft}
              isToolbarLeft={isToolbarLeft}
              isJsonOpen={isJsonOpen}
              setIsJsonOpen={setIsJsonOpen}
            />
          </div>
        </Fragment>
      )}

      {/* The main content goes here */}
      <div className="h-full w-full">
        <div className="h-full w-full overflow-auto">
          <div className="h-full flex justify-center">
            <div className="container flex flex-col border-l border-r">
              <div className="h-16 border-b flex items-center justify-between px-8">
                <EditorPageHeader />
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r px-4 py-12 space-y-2 overflow-auto">
                  <EditorPageSidebar />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
