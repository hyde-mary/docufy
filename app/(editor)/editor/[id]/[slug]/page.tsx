"use client";
import { ThemeToggleClick } from "@/components/theme-toggle-click";
import { useEditorStore } from "@/stores/editor-store";
import Link from "next/link";

import { Github, Facebook, Twitter } from "lucide-react";
import { JSX } from "react";
import { Button } from "@/components/ui/button";

const socialsIcons: Record<string, JSX.Element> = {
  github: <Github className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
};

const EditorPage = () => {
  const { data } = useEditorStore();

  return (
    <div className="h-18 border-b-2 flex items-center justify-center">
      <div className="flex items-center justify-between h-full container w-full">
        <div className="border-r-2 h-full"></div>
        <div className="w-full flex items-center justify-between px-6">
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
        </div>
        <div className="border-l-2 h-full"></div>
      </div>
    </div>
  );
};

export default EditorPage;
