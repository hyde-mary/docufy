"use client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  ChevronsRightLeft,
  Save,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ThemeToggleClick } from "../theme-toggle-click";

import EditorToolbarHeader from "./toolbar/editor-toolbar-header";
import { Fragment, useState } from "react";
import EditorToolbarSidebar from "./toolbar/editor-toolbar-sidebar";
import EditorToolbarPathDropdown from "./toolbar/editor-toolbar-path-dropdown";
import EditorToolbarMainContent from "./toolbar/editor-toolbar-main-content";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useEditorStore } from "@/stores/editor-store/index";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  isToolbarLeft: boolean;
  setIsToolbarLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isSplit: boolean;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorToolbar = ({
  isToolbarLeft,
  setIsToolbarLeft,
  isSplit,
  setIsSplit,
}: EditorToolbarProps) => {
  const { id } = useParams<{ id: Id<"projects"> }>();

  const saveEditorData = useMutation(api.editor_mutations.saveEditorData);

  const { data } = useEditorStore();

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMainContentExpanded, setIsMainContentExpanded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onSave = () => {
    setIsLoading(true);

    const promise = saveEditorData({
      projectId: id,
      data,
    }).finally(() => setIsLoading(false));

    toast.promise(promise, {
      success: "Project data saved successfully.",
      error: "Project data saving failed.",
    });
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
            className={cn("text-sm hover:cursor-pointer")}
            onClick={onSave}
            disabled={isLoading}
          >
            <Save className="w-4 h-4" />
            Save
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
      <CardFooter className={cn("flex items-center")}>
        <div className="flex items-center justify-center gap-x-2 w-full">
          {isToolbarLeft ? (
            <Fragment>
              <div className="flex items-center justify-between gap-x-2 w-full">
                <ThemeToggleClick />
                <div className="flex items-center justify-center gap-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSplit(!isSplit)}
                    className="hover:cursor-pointer"
                  >
                    {isSplit ? (
                      <ChevronsRightLeft className="w-4 h-4" />
                    ) : (
                      <ChevronsLeftRight className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsToolbarLeft(!isToolbarLeft)}
                    className="hover:cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex items-center justify-between gap-x-2 w-full">
                <div className="flex items-center justify-center gap-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsToolbarLeft(!isToolbarLeft)}
                    className="hover:cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSplit(!isSplit)}
                    className="hover:cursor-pointer"
                  >
                    {isSplit ? (
                      <ChevronsRightLeft className="w-4 h-4" />
                    ) : (
                      <ChevronsLeftRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <ThemeToggleClick />
              </div>
            </Fragment>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorToolbar;
