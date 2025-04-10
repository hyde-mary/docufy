"use client";

import { ThemeToggleClick } from "@/components/theme-toggle-click";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/stores/editor-store";
import { Facebook, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Fragment, JSX } from "react";

const socialsIcons: Record<string, JSX.Element> = {
  github: <Github className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
};

const EditorPageHeader = () => {
  const { data } = useEditorStore();

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-base font-bold">{data.title}</h1>
        {data.navLinks.map((link, index) => (
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
          .filter((social) => social.href.trim() !== "")
          .map((social) => (
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

export default EditorPageHeader;
