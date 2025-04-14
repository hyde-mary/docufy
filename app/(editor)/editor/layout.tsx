"use client";

import { Fragment, useState } from "react";
import EditorToolbar from "@/components/editor/editor-toolbar";
import { ChevronLeft, FileJson, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LivePageHeader from "@/components/live/live-page-header";
import LivePageSidebar from "@/components/live/live-page-sidebar";
import EditorJsonViewer from "@/components/editor/editor-json-viewer";
import { useRouter } from "next/navigation";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [isToolbarLeft, setIsToolbarLeft] = useState(true);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* hamburger */}
      <div
        className={cn(
          "fixed top-4 z-50 bg-background p-2 rounded-md flex gap-x-2 left-4"
        )}
      >
        <Button
          variant={"outline"}
          onClick={() => router.push("/")}
          className="rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          className="rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setIsJsonOpen(!isJsonOpen)}
          className="rounded-md shadow-md hover:bg-muted transition hover:cursor-pointer"
        >
          <FileJson className="w-6 h-6" />
        </Button>
      </div>

      {/* Toolbar */}
      {isToolbarOpen && (
        <Fragment>
          <div
            className={`fixed top-[90px] bottom-4 z-40 w-[450px] bg-background overflow-y-auto transition-all duration-300 ${
              isToolbarLeft ? "left-4" : "right-4"
            }`}
          >
            <EditorToolbar
              setIsToolbarLeft={setIsToolbarLeft}
              isToolbarLeft={isToolbarLeft}
              isSplit={isSplit}
              setIsSplit={setIsSplit}
            />
          </div>
        </Fragment>
      )}

      {isJsonOpen && (
        <Fragment>
          <div
            className={cn(
              "fixed top-[90px] bottom-4 z-40 w-[450px] bg-background overflow-y-auto transition-all duration-300",
              (() => {
                if (isSplit) {
                  return isToolbarLeft ? "right-4" : "left-4";
                } else {
                  if (!isToolbarOpen) {
                    return isToolbarLeft ? "left-4" : "right-4";
                  } else {
                    return isToolbarLeft ? "left-[470px]" : "right-[470px]";
                  }
                }
              })()
            )}
          >
            <EditorJsonViewer
              isToolbarOpen={isToolbarOpen}
              setIsToolbarLeft={setIsToolbarLeft}
              isToolbarLeft={isToolbarLeft}
              isSplit={isSplit}
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
                <LivePageHeader />
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r px-4 py-12 space-y-2 overflow-auto">
                  <LivePageSidebar />
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
