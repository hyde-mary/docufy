"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getLucideIcon } from "@/utils/components/getLucideIcon";
import { useMutation, useQuery } from "convex/react";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import PublishProjectDetailsInformation from "./publish-project-details/publish-project-details-information";
import PublishProjectDetailsStatus from "./publish-project-details/publish-project-details-status";
import PublishProjectDetailsVisibility from "./publish-project-details/publish-project-details-visibility";
import PublishProjectDetailsTemplate from "./publish-project-details/publish-project-details-template";
import PublishProjectDetailsTime from "./publish-project-details/publish-project-details-time";
import PublishProjectDetailsContent from "./publish-project-details/publish-project-details-content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const PublishProjectDetails = () => {
  const { user } = useUser();
  const { id } = useParams();
  const project = useQuery(
    api.projects.getProjectById,
    id ? { id: id as Id<"projects"> } : "skip"
  );
  const router = useRouter();
  const unpublishProject = useMutation(api.projects.unpublishProject);
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  useEffect(() => {
    if (project && project.status !== "Publish") {
      router.push("/");
    }
  }, [project, router]);

  if (!project || !user) {
    return (
      <div className="flex flex-col gap-y-8">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  const reorderData = {
    title: project.data.title,
    navLinks: project.data.navLinks,
    theme_toggle: project.data.theme_toggle,
    socials: project.data.socials,
    sections: project.data.sections,
    params: project.data.params,
    rootPage: project.data.rootPage,
    pages: project.data.pages,
  };

  const handleUnpublish = (projectId: Id<"projects">) => {
    setIsUnpublishing(true);
    try {
      unpublishProject({ projectId });
      toast.success("Successfully deleted the project!");
    } catch (error) {
      toast.error("Error deleting project", {
        description: error as string,
      });
    } finally {
      setIsUnpublishing(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getLucideIcon(project.iconName, 24)}
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="!px-4 !py-0 !h-7 text-xs hover:cursor-pointer"
              >
                <Lock className="!w-3 !h-3" />
                Unpublish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Unpublish Website</DialogTitle>
              <DialogDescription>
                Do you really want to unpublish the website? Doing so will make
                it private and hide it from the internet!
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant={"default"}
                  onClick={() => handleUnpublish(project._id)}
                  type="submit"
                  className="hover:cursor-pointer"
                  disabled={isUnpublishing}
                >
                  Unpublish Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Link href={`/publish/${user?.username}/${project.slug}`}>
            <Button
              variant="outline"
              className="hover:cursor-pointer px-4! py-0! h-7! text-xs"
            >
              Go to Live Site
              <ArrowRight className="w-2 h-2" />
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Main Content Grid */}
      <div className="grid grid-cols-4 gap-4">
        <PublishProjectDetailsInformation
          description={project.description}
          username={user?.username}
          slug={project.slug}
        />

        <div className="grid grid-cols-2 col-span-2 gap-4">
          <PublishProjectDetailsStatus status={project.status} />

          <PublishProjectDetailsVisibility visibility={project.visibility} />

          <PublishProjectDetailsTemplate template={project.template} />

          <PublishProjectDetailsTime creationTime={project._creationTime} />
        </div>
      </div>

      {/* JSON Content */}
      <PublishProjectDetailsContent reorderData={reorderData} />
    </div>
  );
};

export default PublishProjectDetails;
