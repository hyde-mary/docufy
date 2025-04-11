"use client";

import { useEditorStore } from "@/stores/editor-store";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";

const EditorPageDynamic = () => {
  const params = useParams<{ id: string; slug: string; dynamic: string }>();
  const { data, setParams } = useEditorStore();

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  return (
    <Fragment>
      <div className="flex-1 text-white p-4">
        <h2>Dynamic Page</h2>
        <p>id: {params.id}</p>
        <p>slug: {params.slug}</p>
        <p>dynamic segment: {params.dynamic}</p>
        <p>
          Full Path: /editor/{params.id}/{params.slug}/{params.dynamic}
        </p>
      </div>

      <div className="w-64 text-white">
        <div className="p-4"></div>
      </div>
    </Fragment>
  );
};

export default EditorPageDynamic;
