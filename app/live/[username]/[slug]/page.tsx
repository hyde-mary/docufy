"use client";

import MarkdownPreview from "@/components/editor/markdown-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { useLiveStore } from "@/stores/live-store";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import { Fragment } from "react";

const EditorPageRoot = () => {
  const { data } = useLiveStore();

  if (!data)
    return (
      <Fragment>
        <div className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="w-64 h-full">
          <div className="px-8 py-12 flex flex-col space-y-4 h-full">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </Fragment>
    );

  const headings = getMarkdownHeadings(data.rootPage.markdown);

  return (
    <Fragment>
      <div className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto">
        <MarkdownPreview markdown={data.rootPage.markdown} />
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

export default EditorPageRoot;
