"use client";
import { ChevronDown, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggleClick } from "../theme-toggle-click";

import EditorToolbarHeader from "./toolbar/editor-toolbar-header";
import { useState } from "react";
import EditorToolbarSidebar from "./toolbar/editor-toolbar-sidebar";
import EditorToolbarPathDropdown from "./toolbar/editor-toolbar-path-dropdown";
import EditorToolbarMainContent from "./toolbar/editor-toolbar-main-content";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useEditorStore } from "@/stores/editor-store";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  isToolbarLeft: boolean;
  setIsToolbarLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorToolbar = ({
  isToolbarLeft,
  setIsToolbarLeft,
}: EditorToolbarProps) => {
  const params = useParams<{ id: string }>();
  const saveEditorData = useMutation(api.editor.saveEditorData);
  const { data } = useEditorStore();

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMainContentExpanded, setIsMainContentExpanded] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    try {
      if (!params.id) return;

      const projectId = params.id as Id<"projects">;

      saveEditorData({ projectId, editorData: data });

      toast("Data has been successfully saved!");
    } catch (error) {
      toast.error("Data saving has failed", {
        description: error as string,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="flex h-full w-full !rounded-none border border-muted-foreground/15">
      <CardHeader className="flex items-center justify-between text-lg font-bold">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center justify-center gap-2">
            <span>Docufy&apos;s Editor</span>
            <span className="text-sm font-medium bg-muted-foreground/30 px-2 py-1 rounded-full">
              BETA v.0
            </span>
          </div>
          <Button
            size={"sm"}
            className={cn(
              "text-sm hover:cursor-pointer",
              isSaving && "bg-gray-500"
            )}
            onClick={() => handleSave()}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving" : "Save"}
          </Button>
        </div>
      </CardHeader>

      <Separator />
      <div className="flex flex-col flex-grow overflow-y-auto gap-y-4">
        <CardContent>
          <EditorToolbarPathDropdown />
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex items-center justify-start mb-4 w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsHeaderExpanded((prev) => !prev)}
              className="w-full flex items-center justify-center hover:cursor-pointer"
            >
              <h2 className="text-sm font-semibold">Header Options</h2>
              {isHeaderExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          {isHeaderExpanded && <EditorToolbarHeader />}
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex items-center justify-start mb-4 w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarExpanded((prev) => !prev)}
              className="w-full flex items-center justify-center hover:cursor-pointer"
            >
              <h2 className="text-sm font-semibold">Sidebar Options</h2>
              {isSidebarExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          {isSidebarExpanded && <EditorToolbarSidebar />}
        </CardContent>
        <Separator />
        <CardContent className="flex-grow min-h-0 flex flex-col">
          <div className="flex items-center justify-start mb-4 w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMainContentExpanded((prev) => !prev)}
              className="w-full flex items-center justify-center hover:cursor-pointer"
            >
              <h2 className="text-sm font-semibold">Main Content</h2>
              {isMainContentExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          {isMainContentExpanded && (
            <div className="flex-grow">
              <EditorToolbarMainContent />
            </div>
          )}
        </CardContent>
      </div>

      <Separator />
      <CardFooter className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant={"ghost"}
            className="hover:cursor-pointer"
            size={"sm"}
          >
            <ChevronLeft />
            Go Back
          </Button>
        </Link>
        <div className="flex items-center justify-center gap-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsToolbarLeft(!isToolbarLeft)}
            className="hover:cursor-pointer"
          >
            {isToolbarLeft ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
          <ThemeToggleClick />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorToolbar;
