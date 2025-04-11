import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/stores/editor-store";

const EditorToolbarMainContent = () => {
  const { data, updateRootPageTitle, updateRootPageSubtitle } =
    useEditorStore();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit your main documentation page. Your main page is
          located at the <span className="underline font-bold">center</span>.
        </p>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-y-4">
        <Label className="font-medium text-sm">Main Page Title</Label>
        <Input
          placeholder="Hydemary's Documentation"
          onChange={(e) => updateRootPageTitle(e.target.value)}
          value={data.rootPage.title}
        />
        <p className="text-xs text-muted-foreground">
          Enter the title of the main page for your documentation.
        </p>
      </div>

      {/* subtitle */}
      <div className="flex flex-col gap-y-4">
        <Label className="font-medium text-sm">Subtitle Documentation</Label>
        <Input
          placeholder="Hydemary's Simple Documentation"
          onChange={(e) => updateRootPageSubtitle(e.target.value)}
          value={data.rootPage.subtitle}
        />
        <p className="text-xs text-muted-foreground">
          Enter the subtitle which will appear below the title for your
          documentation.
        </p>
      </div>
    </div>
  );
};

export default EditorToolbarMainContent;
