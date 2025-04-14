import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PublishProjectDetailsTime = ({
  creationTime,
}: {
  creationTime: string;
}) => {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader className="flex items-center justify-start text-lg font-bold">
        Creation Time
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col justify-center items-start h-full">
        <p className="text-base text-muted-foreground">
          {new Date(creationTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </CardContent>
    </Card>
  );
};

export default PublishProjectDetailsTime;
