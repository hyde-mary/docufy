// components/project-card.tsx
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
} from "@/components/ui/tooltip";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Bookmark, ChevronRight, InfoIcon, Lock } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description?: string;
  iconName?: string;
  status: string;
  visibility: string;
  _creationTime: string;
};

export const ProjectsViewCard = ({
  title,
  description,
  iconName,
  status,
  visibility,
  _creationTime,
}: ProjectCardProps) => {
  return (
    <Card className="w-96 h-64 shadow-sm hover:shadow-md transition-all cursor-pointer rounded-xs!">
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
        <p className="text-sm text-muted-foreground line-clamp-4">
          {description || "No description available."}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {/* status */}
        <div>
          <span className="text-xs text-muted-foreground flex items-center justify-center gap-x-2">
            {visibility.toLowerCase() === "private" ? (
              <>
                <Lock className="w-3 h-3" /> {visibility}
              </>
            ) : (
              <>
                <Bookmark className="w-3 h-3" /> {visibility}
              </>
            )}
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div className="flex items-center gap-2 text-xs">
            <Badge variant={"success"}>{status}</Badge>
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
