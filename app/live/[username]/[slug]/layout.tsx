"use client";

import LivePageHeader from "@/components/live/live-page-header";
import LivePageSidebar from "@/components/live/live-page-sidebar";
import { Loader } from "@/components/loader";
import { api } from "@/convex/_generated/api";
import { useLiveStore } from "@/stores/live-store";
import { LinkSection, LiveData, Page, Section } from "@/types/live";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { setData } = useLiveStore();
  const router = useRouter();

  const project = useQuery(api.projects.getProjectByUsernameAndSlug, {
    username: params.username as string,
    slug: params.slug as string,
  });

  useEffect(() => {
    if (project?.data) {
      const updatedData = updateHrefs(
        project.data,
        params.username as string,
        params.slug as string
      );
      setData(updatedData);
    }
  }, [project, setData, params.username, params.slug, router]);

  function updateHrefs(data: LiveData, username: string, slug: string) {
    const basePath = `/live/${username}/${slug}`;
    const newData = JSON.parse(JSON.stringify(data)); // Deep clone

    if (newData.navLinks) {
      newData.navLinks = newData.navLinks.map((link: LinkSection) => ({
        ...link,
        href: link.href?.startsWith("/editor/")
          ? `${basePath}${link.path}`
          : link.href,
      }));
    }

    if (newData.pages) {
      newData.pages = newData.pages.map((page: Page) => ({
        ...page,
        href: page.href?.startsWith("/editor/")
          ? `${basePath}${page.path}`
          : page.href,
      }));
    }

    if (newData.sections) {
      newData.sections = newData.sections.map((section: Section) => {
        if (section.type === "link" && section.href?.startsWith("/editor/")) {
          return {
            ...section,
            href: `${basePath}${section.path}`,
          };
        }
        if (section.type === "dropdown" && section.items) {
          return {
            ...section,
            items: section.items.map((item) => ({
              ...item,
              href: item.href?.startsWith("/editor/")
                ? `${basePath}${item.path}`
                : item.href,
            })),
          };
        }
        return section;
      });
    }

    return newData;
  }

  if (project === null) router.push("/404");
  if (!project?.data) return <Loader />;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* The main content goes here */}
      <div className="h-full w-full">
        <div className="h-full w-full overflow-auto">
          <div className="h-full flex justify-center">
            <div className="container flex flex-col border-l border-r">
              <div className="h-16 border-b flex items-center justify-between px-8">
                <LivePageHeader />
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r px-4 py-12 space-y-2 overflow-auto">
                  <LivePageSidebar />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
