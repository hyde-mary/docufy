import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/stores/editor-store";

const EditorToolbarMainContent = () => {
  const { data, updateRootPageMarkdown } = useEditorStore();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit your main documentation page. Your main page is
          located at the <span className="underline font-bold">center</span>.
        </p>
      </div>

      {/* Markdown */}
      <div className="flex flex-col gap-y-4">
        <Label className="font-medium text-sm">Main Page Markdown</Label>
        <Textarea
          value={data.rootPage.markdown}
          onChange={(e) => updateRootPageMarkdown(e.target.value)}
          placeholder="You can write your documentation here! This area supports markdown to make it easy for you!"
          className="min-h-[200px]"
        />
        <p className="text-xs text-muted-foreground">
          For the main page. Docufy uses markdown as the format. Why Markdown?
          Markdown allows docufy to &apos;index&apos; your headings so it can
          display it on the right.
        </p>
      </div>
    </div>
  );
};

export default EditorToolbarMainContent;
