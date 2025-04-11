"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";
import EditorPageSidebar from "@/components/editor/page/editor-page-sidebar";

import { useEditorStore } from "@/stores/editor-store";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditorPage = () => {
  const params = useParams<{ id: string; slug: string }>();
  const { data, setParams } = useEditorStore();

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
  }, [params, setParams]);

  console.log(data);

  return (
    <div className="h-full flex justify-center">
      <div className="container flex flex-col border-l border-r">
        {/* header */}
        <div className="h-16 border-b flex items-center justify-between px-8">
          <EditorPageHeader />
        </div>

        {/* content */}
        <div className="flex flex-1 overflow-hidden">
          {/* left sidebar */}
          <div className="w-64 border-r p-4 space-y-2 overflow-auto">
            <EditorPageSidebar />
          </div>

          {/* main content */}
          <div className="flex-1 text-white p-4"></div>

          {/* right sidebar */}
          <div className="w-64 text-white">
            <div className="p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
