"use client";

import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/stores/editor-store/index";
import { useParams } from "next/navigation";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { EditorView } from "@codemirror/view";

const EditorToolbarMainContent = () => {
  const { data, updateRootPageMarkdown, updatePageMarkdown } = useEditorStore();

  const params = useParams<{ id: string; slug: string; dynamic?: string }>();
  const fullPath = `/editor/${params.id}/${params.slug}${params.dynamic ? `/${params.dynamic}` : ""}`;

  const currentPage = data.pages.find((page) => page.href === fullPath);
  const isRootPage = !params.dynamic;

  const markdown = isRootPage
    ? data.rootPage.markdown
    : currentPage?.markdown || "";

  const handleMarkdownChange = (value?: string) => {
    if (isRootPage) {
      updateRootPageMarkdown(value || "");
    } else if (currentPage) {
      updatePageMarkdown(currentPage.href, value || "");
    }
  };

  return (
    <div className="flex flex-col gap-y-8 h-full min-h-[700px]">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          {isRootPage
            ? "Here you can edit your main documentation page. Your main page is located at the "
            : "You're editing a specific documentation page. This is not the main page. "}
          <span className="underline font-bold">
            {isRootPage ? "center" : (currentPage?.name ?? "Unnamed Page")}
          </span>
          .
        </p>
      </div>

      {/* Markdown */}
      <div className="flex flex-col gap-y-4 flex-grow min-h-0">
        <Label className="font-medium text-sm">
          {isRootPage ? "Main Page Markdown" : "Page Markdown"}
        </Label>
        <div className="flex-grow min-h-0 flex flex-col">
          <MarkdownEditor
            value={markdown}
            onChange={handleMarkdownChange}
            height="700px"
            renderPreview={() => null}
            enablePreview={false}
            extensions={[EditorView.lineWrapping]}
          />
          <p className="text-xs text-muted-foreground pt-2">
            {isRootPage
              ? "For the main page, Docufy uses markdown as the format. Why Markdown? Markdown allows docufy to index your headings so it can display it on the right."
              : "You're editing a subpage. Markdown here also supports full formatting, and headings will be parsed accordingly."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbarMainContent;
