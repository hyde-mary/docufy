"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";
import { useEditorStore } from "@/stores/editor-store";
import Link from "next/link";

const EditorPage = () => {
  const { data } = useEditorStore();

  return (
    <div className="h-full">
      <div className="h-18 border-b flex items-center justify-center">
        <div className="flex items-center justify-between h-full container w-full">
          {/* left border */}
          <div className="border-r h-full" />

          {/* header in the center */}
          <EditorPageHeader />

          {/* right border */}
          <div className="border-l h-full" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center h-full">
        <div className="container flex items-center justify-start h-full">
          <div className="h-full w-64 border-l border-r p-6 flex flex-col items-start justify-start gap-y-4">
            {data.sections.map((section, index) => (
              <Link
                href={section.href}
                key={index}
                className="text-sm hover:bg-muted-foreground/15 w-full px-2 py-1 rounded-sm"
              >
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
