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
  RefreshCcw,
  Trash,
} from "lucide-react";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const [isLoading, setIsLoading] = useState(false); // global loading state for all mutations

  const router = useRouter();

  // archive functions
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

  // publish functions
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

  // delete functions
  const onDelete = () => {
    setIsLoading(true);

    const promise = deleteProject({ projectId }).finally(() =>
      setIsLoading(false)
    );

    router.push(`/`);

    toast.promise(promise, {
      success: "Project deleted successfully.",
      error: "Project delete failed.",
    });
  };

  return (
    <>
      {visibility !== "Public" && status === "Active" && (
        <div className="flex items-center gap-x-4">
          <Button
            className="hover:cursor-pointer"
            variant={"secondary"}
            onClick={onArchive}
            disabled={isLoading}
          >
            <Archive className="w-4 h-4" />
            Archive Project
          </Button>

          <Button
            className="hover:cursor-pointer"
            variant={"default"}
            onClick={onPublish}
            disabled={isLoading}
          >
            <Globe className="w-4 h-4" />
            Publish Project
          </Button>

          <Link href={`/editor/${projectId}/${slug}`}>
            <Button variant="outline" className="hover:cursor-pointer">
              Go to editor
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}

      {visibility !== "Public" && status === "Inactive" && (
        <div className="flex items-center justify-center gap-x-4">
          <Button
            className="hover:cursor-pointer"
            variant={"default"}
            onClick={onUnarchive}
            disabled={isLoading}
          >
            <RefreshCcw className="w-4 h-4" />
            Unarchive Project
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover:cursor-pointer" variant={"destructive"}>
                <Trash className="w-4 h-4" />
                Delete Project
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
                  variant={"destructive"}
                  onClick={onDelete}
                  disabled={isLoading}
                >
                  <Trash />
                  Delete Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {visibility === "Public" && (
        <div className="flex items-center justify-center gap-x-4">
          <Button
            className="hover:cursor-pointer"
            variant={"secondary"}
            onClick={onUnpublish}
            disabled={isLoading}
          >
            <Lock className="w-4 h-4" />
            Unpublish Project
          </Button>
          <Button
            className="hover:cursor-pointer"
            variant={"default"}
            onClick={() => router.push(`/live/${username}/${slug}`)}
            disabled={isLoading}
          >
            <Globe className="w-4 h-4" />
            Visit Live Site
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectDetailsActions;
