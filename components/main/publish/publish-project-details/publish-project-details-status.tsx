import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

const PublishProjectDetailsStatus = ({ status }: { status: string }) => {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader className="text-lg font-bold">Project Status</CardHeader>

      <Separator />

      <CardContent className="flex items-center justify-start gap-x-4 h-full">
        <Badge className={cn("w-fit text-sm", "bg-blue-800 text-gray-200")}>
          {status}
        </Badge>
        <p className="text-sm text-muted-foreground">
          Anyone can see your project!
        </p>
      </CardContent>
    </Card>
  );
};

export default PublishProjectDetailsStatus;
