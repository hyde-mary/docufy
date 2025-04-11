"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";
import EditorPageSidebar from "@/components/editor/page/editor-page-sidebar";
import { useEditorStore } from "@/stores/editor-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditorPageRoot = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  return (
    <div className="h-full flex justify-center">
      <div className="container flex flex-col border-l border-r">
        <div className="h-16 border-b flex items-center justify-between px-8">
          <EditorPageHeader />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 border-r p-4 space-y-2 overflow-auto">
            <EditorPageSidebar />
          </div>

          <div className="flex-1 text-white p-4">
            <h2>{"Root Section"}</h2>
            <p>Root content for {params.slug}</p>
          </div>

          <div className="w-64 text-white">
            <div className="p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPageRoot;
