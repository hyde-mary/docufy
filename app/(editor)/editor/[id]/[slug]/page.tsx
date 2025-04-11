"use client";

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
      <div className="flex-1 text-white p-4">
        <h2>{data.rootPage.title}</h2>
        <p>{data.rootPage.content}</p>
      </div>

      <div className="w-64 text-white">
        <div className="p-4"></div>
      </div>
    </Fragment>
  );
};

export default EditorPageRoot;
