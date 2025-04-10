"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";
import EditorPageSidebar from "@/components/editor/page/editor-page-sidebar";

const EditorPage = () => {
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
          <div className="w-64 border-r p-4 space-y-12 overflow-auto">
            <EditorPageSidebar />
          </div>

          {/* main content */}
          <div className="flex-1 text-white p-4">
            <div></div>
          </div>

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
