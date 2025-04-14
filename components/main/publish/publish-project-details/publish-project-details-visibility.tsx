import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PublishProjectDetailsVisibility = ({
  visibility,
}: {
  visibility: string;
}) => {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader className="text-lg font-bold">Project Visibility</CardHeader>

      <Separator />

      <CardContent className="flex justify-start items-center h-full">
        <h2 className="text-base font-medium text-muted-foreground">
          {visibility}
        </h2>
      </CardContent>
    </Card>
  );
};

export default PublishProjectDetailsVisibility;
