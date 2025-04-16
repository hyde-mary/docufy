import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/utils/components/get-lucide-icon";

import { ChevronRight, Globe, InfoIcon, Lock } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description?: string;
  iconName?: string;
  status: string;
  visibility: string;
  _creationTime: number;
};

export const ProjectsCard = ({
  title,
  description,
  iconName,
  status,
  visibility,
  _creationTime,
}: ProjectCardProps) => {
  return (
    <Card className="w-96 h-64 max-h-64 max-h-96 border border-muted-foreground/30 hover:border-muted-foreground/40 transition-all cursor-pointer rounded-xs bg-transparent shadow-none hover:shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center space-x-4">
            {getLucideIcon(iconName)}
            <CardTitle className="text-lg truncate">{title}</CardTitle>
          </div>
          <ChevronRight size={16} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow">
        <p className="text-base text-muted-foreground line-clamp-4">
          {description || "No description available."}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {/* status */}
        <div>
          <span className="text-sm text-muted-foreground flex items-center justify-center gap-x-2">
            {visibility.toLowerCase() === "private" ? (
              <>
                <Lock className="w-4 h-4" /> {visibility}
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" /> {visibility}
              </>
            )}
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex items-center gap-2 text-xs">
            <Badge
              className={cn(
                "w-fit text-sm",
                status === "Active" ? "bg-green-600" : "bg-muted-foreground"
              )}
            >
              {status}
            </Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="hover:cursor-pointer">
                <InfoIcon size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">Created Time:</p>
                <p>{new Date(_creationTime).toLocaleString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};
