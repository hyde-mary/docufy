import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggleClick } from "../theme-toggle-click";

import EditorHeader from "./sidebar/editor-header";

const EditorSidebar = () => {
  return (
    <Card className="flex h-full w-full !rounded-none border border-muted-foreground/15">
      <CardHeader className="text-lg font-bold">
        Docufy&apos;s Editor
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col flex-grow overflow-y-auto">
        <EditorHeader />
      </CardContent>
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
