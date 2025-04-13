"use client";
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
import {
  Bookmark,
  InfoIcon,
  Lock,
  MoreHorizontal,
  RotateCcw,
  Trash,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";

type ProjectCardProps = {
  projectId: string;
  title: string;
  slug: string;
  description?: string;
  iconName?: string;
  status: string;
  visibility: string;
  _creationTime: string;
};

export const TrashProjectsViewCard = ({
  projectId,
  title,
  slug,
  description,
  iconName,
  status,
  visibility,
  _creationTime,
}: ProjectCardProps) => {
  const deleteProject = useMutation(api.projects.deleteProject);
  const restoreProject = useMutation(api.projects.restoreProjectFromTrash);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const router = useRouter();

  const handleRestoreProject = (projectId: Id<"projects">) => {
    setIsRestoring(true);
    try {
      restoreProject({ projectId });
      toast.success("Successfully restored the project!");
      router.push(`/projects/${projectId}/${slug}`);
    } catch (error) {
      toast.error("Error restoring project", {
        description: error as string,
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const handleDeleteProject = (projectId: Id<"projects">) => {
    setIsDeleting(true);
    try {
      deleteProject({ projectId });
      toast.success("Successfully deleted the project!");
    } catch (error) {
      toast.error("Error deleting project", {
        description: error as string,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-96 h-64 shadow-sm hover:shadow-md transition-all rounded-xs">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center space-x-4">
            {getLucideIcon(iconName)}
            <CardTitle className="text-lg truncate">{title}</CardTitle>
          </div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="h-8 w-8 hover:cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Project Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={cn(
                    "gap-x-4 hover:cursor-pointer",
                    isRestoring || (isDeleting && "bg-gray-500")
                  )}
                  onClick={() =>
                    handleRestoreProject(projectId as Id<"projects">)
                  }
                  disabled={isRestoring || isDeleting}
                >
                  <RotateCcw className="w-4 h-4" />
                  {isRestoring ? "Restoring project..." : "Restore Project"}
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className={cn(
                      "gap-x-4 hover:cursor-pointer",
                      isRestoring || (isDeleting && "bg-gray-500")
                    )}
                    disabled={isRestoring || isDeleting}
                  >
                    <Trash className="w-4 h-4" />
                    {isDeleting ? "Deleting Project..." : "Delete Project"}
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this Project Completely?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this project from our servers?
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant={"destructive"}
                  onClick={() =>
                    handleDeleteProject(projectId as Id<"projects">)
                  }
                  className={cn(
                    "hover:cursor-pointer hover:!bg-red-700",
                    isDeleting && "bg-gray-500"
                  )}
                  disabled={isDeleting}
                  type="submit"
                >
                  {isDeleting ? "Deleting Project..." : "Delete Project"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <Badge variant={"destructive"}>{status}</Badge>
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
