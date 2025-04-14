"use client";

import { ThemeToggleClick } from "@/components/theme-toggle-click";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, JSX } from "react";
import { Skeleton } from "../ui/skeleton";
import { NavLink, Social } from "@/types/live";
import { useLiveStore } from "@/stores/live-store";

const socialsIcons: Record<string, JSX.Element> = {
  github: <Github className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
};

const LivePageHeader = () => {
  const params = useParams();
  const { data } = useLiveStore();

  if (!data)
    return (
      <div className="w-full h-full py-4">
        <Skeleton className="w-full h-full" />
      </div>
    );

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-base font-bold">
          <Link href={`/live/${params.username}/${params.slug}`}>
            {data.title}
          </Link>
        </h1>
        {data.navLinks.map((link: NavLink, index: number) => (
          <Link
            key={index}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-gray-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-x-4">
        {data.socials
          .filter((social: Social) => social.href.trim() !== "")
          .map((social: Social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm"
            >
              <Button variant={"ghost"} className="hover:cursor-pointer">
                {socialsIcons[social.platform]}
              </Button>
            </a>
          ))}
        {data.theme_toggle && <ThemeToggleClick />}
      </div>
    </Fragment>
  );
};

export default LivePageHeader;
