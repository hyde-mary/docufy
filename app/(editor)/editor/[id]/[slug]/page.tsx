"use client";

import MarkdownPreview from "@/components/editor/markdown-preview";
import { useEditorStore } from "@/stores/editor-store";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";

const EditorPageRoot = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const headings = getMarkdownHeadings(data.rootPage.markdown);

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTo({
        top: previewRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [data.rootPage.markdown]);

  return (
    <Fragment>
      <div
        ref={previewRef}
        className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto"
      >
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
