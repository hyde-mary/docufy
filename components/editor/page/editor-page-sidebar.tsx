import { useEditorStore } from "@/stores/editor-store";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

const EditorPageSidebar = () => {
  const { data } = useEditorStore();
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const allDropdownIndices = data.sections
      .map((section, index) => (section.type === "dropdown" ? index : null))
      .filter((i): i is number => i !== null);

    setOpenDropdowns(allDropdownIndices);
  }, [data]);

  return (
    <Fragment>
      {data.sections.map((section, index) => {
        if (section.type === "text") {
          return (
            <p
              key={index}
              className="text-base font-bold truncate w-full px-4 py-1"
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
              className="w-full text-base block"
            >
              <p className="hover:bg-muted-foreground/10 text-muted-foreground rounded-sm px-4 py-1">
                {section.name}
              </p>
            </Link>
          );
        }

        if (section.type === "dropdown") {
          const isOpen = openDropdowns.includes(index);

          if (section.name !== "") {
            return (
              <div key={index} className="px-4 space-y-2 py-1 w-full">
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
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block text-base text-muted-foreground hover:underline py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return null;
        }

        return null;
      })}
    </Fragment>
  );
};

export default EditorPageSidebar;
