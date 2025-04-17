"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Archive,
  ArrowRight,
  Globe,
  Lock,
  MoreHorizontal,
  RefreshCcw,
  Trash,
} from "lucide-react";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectDetailsActionsProps {
  username: string;
  visibility: "Private" | "Public";
  status: "Active" | "Inactive";
  projectId: Id<"projects">;
  slug: string;
}

const ProjectDetailsActions = ({
  username,
  visibility,
  status,
  projectId,
  slug,
}: ProjectDetailsActionsProps) => {
  const archiveProject = useMutation(api.projects_mutations.archiveProject);
  const unarchiveProject = useMutation(api.projects_mutations.unarchiveProject);
  const publishProject = useMutation(api.projects_mutations.publishProject);
  const unpublishProject = useMutation(api.projects_mutations.unpublishProject);
  const deleteProject = useMutation(api.projects_mutations.deleteProject);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const onArchive = () => {
    setIsLoading(true);

    const promise = archiveProject({ projectId }).finally(() =>
      setIsLoading(false)
    );

    router.push(`/archived/${projectId}/${slug}`);

    toast.promise(promise, {
      success: "Project archived successfully.",
      error: "Project archived failed.",
    });
  };

  const onUnarchive = () => {
    setIsLoading(true);

    const promise = unarchiveProject({ projectId }).finally(() =>
      setIsLoading(false)
    );

    router.push(`/projects/${projectId}/${slug}`);

    toast.promise(promise, {
      success: "Project unarchived successfully.",
      error: "Project unarchived failed.",
    });
  };

  const onPublish = () => {
    setIsLoading(true);

    const promise = publishProject({ projectId }).finally(() =>
      setIsLoading(false)
    );

    router.push(`/published/${projectId}/${slug}`);

    toast.promise(promise, {
      success: "Project published successfully.",
      error: "Project publish failed.",
    });
  };

  const onUnpublish = () => {
    setIsLoading(true);

    const promise = unpublishProject({ projectId }).finally(() =>
      setIsLoading(false)
    );

    router.push(`/projects/${projectId}/${slug}`);

    toast.promise(promise, {
      success: "Project unpublished successfully.",
      error: "Project unpublish failed.",
    });
  };

  const onDelete = () => {
    setIsLoading(true);

    const promise = deleteProject({ projectId }).finally(() => {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    });

    router.push(`/`);

    toast.promise(promise, {
      success: "Project deleted successfully.",
      error: "Project delete failed.",
    });
  };

  const MobileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {visibility !== "Public" && status === "Active" && (
          <>
            <DropdownMenuItem onClick={onArchive} disabled={isLoading}>
              <Archive className="mr-2 h-4 w-4" />
              Archive Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onPublish} disabled={isLoading}>
              <Globe className="mr-2 h-4 w-4" />
              Publish Project
            </DropdownMenuItem>
          </>
        )}

        {visibility !== "Public" && status === "Inactive" && (
          <>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isLoading}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUnarchive} disabled={isLoading}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Unarchive Project
            </DropdownMenuItem>
          </>
        )}

        {visibility === "Public" && (
          <>
            <DropdownMenuItem onClick={onUnpublish} disabled={isLoading}>
              <Lock className="mr-2 h-4 w-4" />
              Unpublish Project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/live/${username}/${slug}`)}
              disabled={isLoading}
            >
              <Globe className="mr-2 h-4 w-4" />
              Visit Live Site
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem asChild disabled>
          <Link href={`/editor/${projectId}/${slug}`}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Go to editor
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <div className="sm:hidden">
        <MobileDropdown />
      </div>

      <div className="hidden sm:block">
        {visibility !== "Public" && status === "Active" && (
          <div className="flex items-center gap-x-4">
            <Button
              className="hover:cursor-pointer"
              variant="secondary"
              onClick={onArchive}
              disabled={isLoading}
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>

            <Button
              className="hover:cursor-pointer"
              variant="default"
              onClick={onPublish}
              disabled={isLoading}
            >
              <Globe className="w-4 h-4 mr-2" />
              Publish
            </Button>

            <Link href={`/editor/${projectId}/${slug}`}>
              <Button variant="outline" className="hover:cursor-pointer">
                Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {visibility !== "Public" && status === "Inactive" && (
          <div className="flex items-center gap-x-4">
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="hover:cursor-pointer" variant="destructive">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Delete Project?</DialogTitle>
                <DialogDescription>
                  Are you really sure you want to delete the project? This will
                  delete this project in our servers.{" "}
                  <span className="text-red-500">This cannot be undone</span>
                </DialogDescription>
                <DialogFooter>
                  <Button
                    className="hover:cursor-pointer"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isLoading}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              className="hover:cursor-pointer"
              variant="default"
              onClick={onUnarchive}
              disabled={isLoading}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Unarchive
            </Button>

            <Link href={`/editor/${projectId}/${slug}`}>
              <Button variant="outline" className="hover:cursor-pointer">
                Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {visibility === "Public" && (
          <div className="flex items-center gap-x-4">
            <Button
              className="hover:cursor-pointer"
              variant="secondary"
              onClick={onUnpublish}
              disabled={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              Unpublish
            </Button>

            <Button
              className="hover:cursor-pointer"
              variant="default"
              onClick={() => router.push(`/live/${username}/${slug}`)}
              disabled={isLoading}
            >
              <Globe className="w-4 h-4 mr-2" />
              Visit Live
            </Button>

            <Link href={`/editor/${projectId}/${slug}`}>
              <Button variant="outline" className="hover:cursor-pointer">
                Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogTitle>Delete Project?</DialogTitle>
            <DialogDescription>
              Are you really sure you want to delete the project? This will
              delete this project in our servers.{" "}
              <span className="text-red-500">This cannot be undone</span>
            </DialogDescription>
            <DialogFooter>
              <Button
                className="hover:cursor-pointer"
                variant="destructive"
                onClick={onDelete}
                disabled={isLoading}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProjectDetailsActions;
