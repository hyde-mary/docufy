import { useEditorStore } from "@/stores/editor-store";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorJsonViewerProps {
  isToolbarOpen: boolean;
  isToolbarLeft: boolean;
  setIsToolbarLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isSplit: boolean;
}

type Page = {
  name: string;
  path: string;
  href: string;
  markdown: string;
};

type RootPage = {
  markdown: string;
};

type Params = {
  id: string;
  slug: string;
};

type TextSection = {
  type: "text";
  name: string;
};

type LinkSection = {
  type: "link";
  name: string;
  path: string; // user editable: for example /introduction
  href: string; // auto-generated: /[id]/[...slug]/${path}
};

type DropdownSection = {
  type: "dropdown";
  name: string;
  items: LinkSection[];
};

type Section = TextSection | LinkSection | DropdownSection;

type Social = {
  platform: "github" | "facebook" | "twitter";
  href: string;
};

type NavLink = {
  name: string;
  path: string; // user editable: for example /introduction
  href: string; // auto-generated: /[id]/[...slug]/${path}
};

type ReorderData = {
  title: string;
  navLinks: NavLink[];
  theme_toggle: boolean;
  socials: Social[];
  sections: Section[];
  params: Params;
  rootPage: RootPage;
  pages: Page[];
};

const EditorJsonViewer = ({
  isToolbarOpen,
  isToolbarLeft,
  setIsToolbarLeft,
  isSplit,
}: EditorJsonViewerProps) => {
  const { data } = useEditorStore();
  const reorderData: ReorderData = {
    title: data.title,
    navLinks: data.navLinks,
    theme_toggle: data.theme_toggle,
    socials: data.socials,
    sections: data.sections,
    params: data.params,
    rootPage: data.rootPage,
    pages: data.pages,
  };

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
            {JSON.stringify(reorderData, null, 2)}
          </pre>
        </CardContent>
      </div>
      <CardFooter
        className={cn(
          "flex items-center",
          isToolbarLeft && !isSplit && "justify-end",
          !isToolbarLeft && isSplit && "justify-end"
        )}
      >
        {/* here we just invert the icons */}
        <div className="flex items-center justify-center gap-x-2">
          {!isToolbarOpen &&
            (isToolbarLeft ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsToolbarLeft(!isToolbarLeft)}
                className="hover:cursor-pointer"
              >
                {isSplit ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsToolbarLeft(!isToolbarLeft)}
                className="hover:cursor-pointer"
              >
                {isSplit ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorJsonViewer;
