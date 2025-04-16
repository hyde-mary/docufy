import { Card, CardContent } from "@/components/ui/card";

import { Plus } from "lucide-react";

import Link from "next/link";

export const ProjectsCreateCard = () => {
  return (
    <Link href="/projects/create">
      <Card className="w-96 h-64 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all cursor-pointer rounded-xs bg-transparent shadow-none hover:shadow-sm">
        <CardContent className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center gap-2 gap-y-6 text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-12 h-12" />
            <p className="text-base font-bold">Click to create a new project</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
