"use client";

import MarkdownPreview from "@/components/editor/markdown-preview";
import { useEditorStore } from "@/stores/editor-store";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";

const EditorPageRoot = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  return (
    <Fragment>
      <div className="flex-1 px-40 py-24 flex-col space-y-2 overflow-auto">
        <MarkdownPreview markdown={data.rootPage.markdown} />
      </div>

      <div className="w-64">
        <div className="p-4"></div>
      </div>
    </Fragment>
  );
};

export default EditorPageRoot;
