"use client";

import { ThemeToggleClick } from "@/components/theme-toggle-click";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Twitter, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useState } from "react";
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
  const [navOpen, setNavOpen] = useState(false);

  if (!data)
    return (
      <div className="w-full h-full py-4">
        <Skeleton className="w-full h-full" />
      </div>
    );

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <button
        className="md:hidden p-2 rounded-md hover:bg-muted"
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        {navOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-base font-bold truncate flex-1 md:flex-none">
          <Link href={`/live/${params.username}/${params.slug}`}>
            {data.title}
          </Link>
        </h1>

        <div
          className={`${navOpen ? "fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6" : "hidden"} md:flex md:flex-row md:items-center md:gap-4 md:relative md:bg-transparent`}
        >
          {navOpen && (
            <button
              className="absolute top-4 right-4 p-2 md:hidden"
              onClick={() => setNavOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          )}

          {data.navLinks.map((link: NavLink, index: number) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 md:px-0 md:py-0"
              onClick={() => setNavOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {data.socials
          .filter((social: Social) => social.href.trim() !== "")
          .map((social: Social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-sm"
            >
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer h-8 w-8 p-0"
              >
                {socialsIcons[social.platform]}
              </Button>
            </a>
          ))}
        {data.theme_toggle && <ThemeToggleClick />}
      </div>
    </div>
  );
};

export default LivePageHeader;
