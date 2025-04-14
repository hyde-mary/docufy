import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PublishProjectDetailsTemplate = ({ template }: { template: string }) => {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader className="flex items-center justify-start text-lg font-bold">
        Project Template
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col justify-center h-full">
        <h2 className="text-base font-medium text-muted-foreground">
          {template}
        </h2>
      </CardContent>
    </Card>
  );
};

export default PublishProjectDetailsTemplate;
