"use client";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import MarkdownPreview from "@/components/editor/markdown-preview";
import { useLiveStore } from "@/stores/live-store";

const EditorPageDynamic = () => {
  const params = useParams<{
    username: string;
    slug: string;
    dynamic: string;
  }>();
  const fullPath = `/live/${params.username}/${params.slug}/${params.dynamic}`;
  const prevPathRef = useRef(fullPath);

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
    <Fragment>
      <div className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto">
        <MarkdownPreview
          markdown={page.markdown}
          key={contentChanged ? fullPath : "static-preview"}
        />
      </div>
      <div className="w-64">
        <div className="px-4 py-12 flex flex-col space-y-4">
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
    </Fragment>
  );
};

export default EditorPageDynamic;
