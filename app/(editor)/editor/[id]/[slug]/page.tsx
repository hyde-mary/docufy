"use client";

import EditorPageHeader from "@/components/editor/page/editor-page-header";
import { useEditorStore } from "@/stores/editor-store";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const EditorPage = () => {
  const { data } = useEditorStore();
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
          <div className="h-full w-64 border-l border-r p-6 flex flex-col items-start justify-start gap-y-2 truncate">
            {data.sections.map((section, index) => {
              if (section.type === "text") {
                return (
                  <p
                    key={index}
                    className="text-base p-1 px-2 font-bold truncate w-full"
                    title={section.name}
                  >
                    {section.name}
                  </p>
                );
              }

              if (section.type === "link") {
                return (
                  <Link
                    key={index}
                    href={section.href}
                    className="w-full text-base"
                  >
                    <p className="p-1 px-2 hover:bg-muted-foreground/10 text-gray-300 rounded-sm">
                      {section.name}
                    </p>
                  </Link>
                );
              }

              if (section.type === "dropdown") {
                const isOpen = openDropdowns.includes(index);
                return (
                  <div key={index} className="px-2 p-1 space-y-3 w-full">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center justify-between w-full text-base font-medium hover:underline hover:cursor-pointer"
                    >
                      <p>{section.name}</p>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="block text-base text-muted-foreground hover:underline"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
