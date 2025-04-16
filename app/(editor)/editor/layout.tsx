"use client";

import { useConvexAuth, useQuery } from "convex/react";

import { Button } from "@/components/ui/button";

import { Loader } from "@/components/loader";
import EditorPageSidebar from "@/components/editor/page/editor-page-sidebar";
import EditorPageHeader from "@/components/editor/page/editor-page-header";
import EditorToolbar from "@/components/editor/editor-toolbar";
import EditorJsonViewer from "@/components/editor/editor-json-viewer";

import { useParams, useRouter } from "next/navigation";

import { ChevronLeft, FileJson, Menu } from "lucide-react";

import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useEditorStore } from "@/stores/editor-store";
import { Id } from "@/convex/_generated/dataModel";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { setData } = useEditorStore();

  const editorData = useQuery(
    api.editor_queries.getEditorData,
    !isLoading && isAuthenticated && id
      ? { projectId: id as Id<"projects"> }
      : "skip"
  );

  useEffect(() => {
    if (editorData) {
      setData(editorData);
    }
  }, [editorData, setData]);

  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isToolbarLeft, setIsToolbarLeft] = useState(true);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const router = useRouter();

  if (isLoading) return <Loader />;

  if (!isLoading && !editorData) return <Loader />;

  if (!isAuthenticated && !isLoading) router.push("/landing");

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
