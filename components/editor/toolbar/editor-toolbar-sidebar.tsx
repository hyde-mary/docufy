import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/stores/editor-store";
import { Plus, X } from "lucide-react";
import React from "react";

const EditorToolbarSidebar = () => {
  const { data, addTextSection, updateTextSection, removeTextSection } =
    useEditorStore();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit the sidebar for you documentation. Your sidebar is
          located at the <span className="underline font-bold">left</span> and
          typically contains all the sections for your documentation
        </p>
      </div>

      {/* sidebar Sections */}
      <div className="flex flex-col gap-y-4">
        <Label className="font-medium text-sm">Sidebar Sections</Label>
        {data.sections.map((section, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder="Section Name"
              value={section.name}
              onChange={(e) =>
                updateTextSection(index, { ...section, name: e.target.value })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTextSection(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {/* add section button */}
        {data.sections.length < 20 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={addTextSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Text
            </Button>
            <Button
              variant="outline"
              onClick={addTextSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Link
            </Button>
            <Button
              variant="outline"
              onClick={addTextSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Dropdown
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Here you can add sections for your documentation.
        </p>
      </div>
    </div>
  );
};

export default EditorToolbarSidebar;
