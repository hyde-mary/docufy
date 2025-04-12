import { useEditorStore } from "@/stores/editor-store";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggleClick } from "../theme-toggle-click";

interface EditorJsonViewerProps {
  isToolbarLeft: boolean;
  setIsToolbarLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isJsonOpen: boolean;
  setIsJsonOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorJsonViewer = ({
  isToolbarLeft,
  setIsToolbarLeft,
  isJsonOpen,
  setIsJsonOpen,
}: EditorJsonViewerProps) => {
  const { data } = useEditorStore();

  return (
    <Card className="flex h-full w-full !rounded-none border border-muted-foreground/15">
      <CardHeader className="flex items-center justify-between text-lg font-bold">
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Docufy&apos;s JSON Viewer</span>
        </div>
      </CardHeader>
      <Separator />
      <div className="flex flex-col flex-grow overflow-y-auto gap-y-4">
        <CardContent className="flex flex-col gap-y-4">
          <Label>Your Documentation&apos;s data in .JSON Format</Label>
          <p className="text-sm text-muted-foreground">
            Below is the overall data of your documentation in .json format
            stored in our server.
          </p>
          <pre className="bg-muted p-4 text-xs rounded-md overflow-auto whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </div>
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
        <Button
          variant={"default"}
          size={"sm"}
          className="text-[12px]"
          onClick={() => setIsJsonOpen(!isJsonOpen)}
        >
          JSON Editor
        </Button>
        {/* here we just invert the icons */}
        <div className="flex items-center justify-center gap-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsToolbarLeft(!isToolbarLeft)}
            className="hover:cursor-pointer"
          >
            {isToolbarLeft ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
          <ThemeToggleClick />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorJsonViewer;
