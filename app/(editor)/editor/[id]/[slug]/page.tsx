"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";

const EditorPage = () => {
  return (
    <div className="h-18 border-b-2 flex items-center justify-center">
      <div className="flex items-center justify-between h-full container w-full">
        {/* left border */}
        <div className="border-r-2 h-full" />

        {/* header in the center */}
        <EditorPageHeader />

        {/* right border */}
        <div className="border-l-2 h-full" />
      </div>
    </div>
  );
};

export default EditorPage;
