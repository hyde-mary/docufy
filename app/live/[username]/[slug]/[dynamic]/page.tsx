"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import MarkdownPreview from "@/components/editor/markdown-preview";
import { useLiveStore } from "@/stores/live-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditorPageDynamic = () => {
  const params = useParams<{
    username: string;
    slug: string;
    dynamic: string;
  }>();
  const fullPath = `/live/${params.username}/${params.slug}/${params.dynamic}`;
  const prevPathRef = useRef(fullPath);
  const [tocOpen, setTocOpen] = useState(false);

  const { data } = useLiveStore();

  const page = useMemo(() => {
    if (!data) return;
    return data.pages.find((p) => p.href === fullPath);
  }, [data, fullPath]);

  const contentChanged = useMemo(() => {
    return prevPathRef.current !== fullPath;
  }, [fullPath]);

  useEffect(() => {
    prevPathRef.current = fullPath;
  }, [fullPath]);

  if (!page) return null;

  const headings = getMarkdownHeadings(page.markdown);

  return (
    <div className="flex flex-1 w-full">
      <div className="flex-1 px-4 md:px-40 py-8 md:py-12 overflow-auto">
        <div className="w-full">
          <MarkdownPreview
            markdown={page.markdown}
            key={contentChanged ? fullPath : "static-preview"}
          />

          {headings.length > 0 && (
            <div className="md:hidden mt-8 border-t pt-4 mb-8">
              <Button
                variant="outline"
                className="flex items-center w-full justify-between"
                onClick={() => setTocOpen(!tocOpen)}
              >
                <span>On This Page</span>
                {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>

              {tocOpen && (
                <div className="mt-4 space-y-2 pl-2">
                  {headings.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${heading.id}`}
                      style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                      className="text-sm text-muted-foreground hover:underline block py-1"
                      onClick={() => setTocOpen(false)}
                    >
                      {heading.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-64 hidden md:block overflow-auto">
        <div className="px-4 py-12 flex flex-col space-y-4 sticky top-0">
          {headings.length > 0 && (
            <p className="text-base font-medium">On This Page</p>
          )}
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
              className="text-sm text-muted-foreground hover:underline"
            >
              {heading.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorPageDynamic;
