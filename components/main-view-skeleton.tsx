import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MainViewSkeleton = () => {
  return (
    <div className="flex items-center justify-start py-4 gap-8 flex-wrap">
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Separator />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
      <Skeleton className="w-96 h-64" />
    </div>
  );
};

export default MainViewSkeleton;
