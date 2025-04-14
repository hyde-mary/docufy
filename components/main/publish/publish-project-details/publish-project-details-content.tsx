import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EditorData } from "@/types/editor";
import React from "react";

const PublishProjectDetailsContent = ({
  reorderData,
}: {
  reorderData: EditorData;
}) => {
  return (
    <Card className="rounded-none w-full">
      <CardHeader className="flex items-start justify-start text-lg font-bold">
        Project Content
      </CardHeader>
      <Separator />
      <CardContent className="px-6 space-y-4">
        <CardDescription className="text-sm text-muted-foreground">
          Docufy uses a{" "}
          <code className="rounded-sm px-1.5 py-0.5 bg-muted text-sm">
            json
          </code>{" "}
          format to store and display your documentation content.
        </CardDescription>
        <div className="rounded-md border w-full">
          <pre className="w-full p-4 bg-muted text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(reorderData, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishProjectDetailsContent;
