"use client";

import MarkdownPreview from "@/components/editor/markdown-preview";
import { useEditorStore } from "@/stores/editor-store";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";

const EditorPageRoot = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();
  const headings = getMarkdownHeadings(data.rootPage.markdown);

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  return (
    <Fragment>
      <div className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto">
        <MarkdownPreview markdown={data.rootPage.markdown} />
      </div>

      <div className="w-64">
        <div className="px-4 py-12 flex flex-col space-y-4">
          <p>On this Page</p>
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.text.toLowerCase().replace(/\s+/g, "-")}`}
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
