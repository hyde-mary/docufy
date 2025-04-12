import { useEditorStore } from "@/stores/editor-store";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  BetweenVerticalEnd,
  ChevronLeft,
  ChevronRight,
  SquareSplitHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorJsonViewerProps {
  isToolbarLeft: boolean;
  setIsToolbarLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isSplit: boolean;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorJsonViewer = ({
  isToolbarLeft,
  setIsToolbarLeft,
  isSplit,
  setIsSplit,
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
      <CardFooter
        className={cn(
          "flex items-center",
          isToolbarLeft ? "justify-start" : "justify-end",
          isSplit ? "justify-start" : "justify-end"
        )}
      >
        {/* here we just invert the icons */}
        <div className="flex items-center justify-center gap-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsToolbarLeft(!isToolbarLeft)}
            className="hover:cursor-pointer"
          >
            {isToolbarLeft ? (
              isSplit ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSplit(!isSplit)}
            className="hover:cursor-pointer"
          >
            {isSplit ? (
              <BetweenVerticalEnd className="w-4 h-4" />
            ) : (
              <SquareSplitHorizontal className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorJsonViewer;
