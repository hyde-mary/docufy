"use client";

import LivePageHeader from "@/components/live/live-page-header";
import LivePageSidebar from "@/components/live/live-page-sidebar";
import { Loader } from "@/components/loader";
import { api } from "@/convex/_generated/api";
import { useLiveStore } from "@/stores/live-store";
import { LinkSection, LiveData, Page, Section } from "@/types/live";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { setData } = useLiveStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="h-full w-full">
        <div className="h-full w-full overflow-auto">
          <div className="h-full flex justify-center">
            <div className="container flex flex-col border-l border-r w-full">
              <div className="h-16 border-b flex items-center justify-between px-4 md:px-8 gap-x-2">
                <LivePageHeader />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSidebar}
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-1 overflow-hidden relative">
                <div
                  className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
                    sidebarOpen ? "block" : "hidden"
                  }`}
                  onClick={toggleSidebar}
                />

                <div
                  className={`absolute md:relative w-64 border-r bg-background md:bg-transparent z-50 h-full md:translate-x-0 transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <div className="px-4 py-12 space-y-2 overflow-auto h-full">
                    <LivePageSidebar />
                  </div>
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
