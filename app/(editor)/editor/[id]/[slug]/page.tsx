"use client";

import MarkdownPreview from "@/components/editor/markdown-preview";
import { useEditorStore } from "@/stores/editor-store";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

const EditorPageRoot = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const prevMarkdownLength = useRef(data.rootPage.markdown?.length || 0);

  const headings = getMarkdownHeadings(data.rootPage.markdown);

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const currentLength = data.rootPage.markdown?.length || 0;
    if (currentLength > prevMarkdownLength.current && previewRef.current) {
      previewRef.current.scrollTo({
        top: previewRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    prevMarkdownLength.current = currentLength;
  }, [data.rootPage.markdown, initialLoad]);

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
