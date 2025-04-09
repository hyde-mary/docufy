"use client";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggleClick } from "../theme-toggle-click";

import EditorSidebarHeader from "./sidebar/editor-sidebar-header";
import { useState } from "react";

const EditorSidebar = () => {
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);

  return (
    <Card className="flex h-full w-full !rounded-none border border-muted-foreground/15">
      <CardHeader className="flex items-center justify-between text-lg font-bold">
        <div className="flex items-center justify-between gap-2 w-full">
          <span>Docufy&apos;s Editor</span>
          <span className="text-sm font-medium bg-muted-foreground/30 px-2 py-1 rounded-full">
            BETA v.0
          </span>
        </div>
      </CardHeader>

      <Separator />
      <div className="flex flex-col flex-grow overflow-y-auto gap-y-4">
        <CardContent>
          <div className="flex items-center justify-start mb-4 w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsHeaderExpanded((prev) => !prev)}
              className="w-full flex items-center justify-center"
            >
              <h2 className="text-sm font-semibold">Header Options</h2>
              {isHeaderExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          {isHeaderExpanded && <EditorSidebarHeader />}
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-base font-bold underline">Sidebar Options</h1>
              <p className="text-xs text-muted-foreground">
                Here you can edit the sidebar for you documentation. Your
                sidebar is located at the{" "}
                <span className="underline font-bold">left</span> and typically
                contains all the tabs for your documentation
              </p>
            </div>
          </div>
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
        <ThemeToggleClick />
      </CardFooter>
    </Card>
  );
};

export default EditorSidebar;
