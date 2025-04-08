import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

const EditorSidebar = () => {
  return (
    <Card className="flex h-full w-full rounded-sm border border-muted-foreground/15">
      <CardHeader className="text-lg font-bold">
        Docufy&apos;s Editor
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
    </Card>
  );
};

export default EditorSidebar;
