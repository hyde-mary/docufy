"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/stores/editor-store";

const EditorToolbarMainContent = () => {
  const { data, updateRootPageMarkdown } = useEditorStore();

  return (
    <div className="flex flex-col gap-y-8 h-full">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit your main documentation page. Your main page is
          located at the <span className="underline font-bold">center</span>.
        </p>
      </div>

      {/* Markdown - flex-grow to fill remaining space */}
      <div className="flex flex-col gap-y-4 flex-grow min-h-0">
        <Label className="font-medium text-sm">Main Page Markdown</Label>
        <div className="flex-grow min-h-0 flex flex-col">
          <Textarea
            value={data.rootPage.markdown}
            onChange={(e) => updateRootPageMarkdown(e.target.value)}
            placeholder="You can write your documentation here! This area supports markdown to make it easy for you!"
            className="flex-grow min-h-0"
          />
          <p className="text-xs text-muted-foreground pt-2">
            For the main page. Docufy uses markdown as the format. Why Markdown?
            Markdown allows docufy to &apos;index&apos; your headings so it can
            display it on the right.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbarMainContent;
