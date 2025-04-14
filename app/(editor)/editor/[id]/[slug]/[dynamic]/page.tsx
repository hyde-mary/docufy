"use client";
import { useEditorStore } from "@/stores/editor-store";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useAllEditorHrefs } from "@/hooks/useAllEditorHrefs";
import { getMarkdownHeadings } from "@/utils/getMarkdownHeadings";
import MarkdownPreview from "@/components/editor/markdown-preview";

const EditorPageDynamic = () => {
  const params = useParams<{ id: string; slug: string; dynamic: string }>();
  const { data, setParams } = useEditorStore();
  const router = useRouter();
  const validHrefs = useAllEditorHrefs();
  const fullPath = `/editor/${params.id}/${params.slug}/${params.dynamic}`;
  const isValidPath = validHrefs.some(({ href }) => href === fullPath);
  const prevPathRef = useRef(fullPath);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id && params.slug) {
      setParams(params.id, params.slug);
    }
    if (!isValidPath) {
      router.push(`/editor/${params.id}/${params.slug}/`);
    }
  }, [params, setParams, isValidPath, router, fullPath]);

  const page = useMemo(() => {
    return data.pages.find((p) => p.href === fullPath);
  }, [data.pages, fullPath]);

  const contentChanged = useMemo(() => {
    return prevPathRef.current !== fullPath;
  }, [fullPath]);

  useEffect(() => {
    prevPathRef.current = fullPath;
  }, [fullPath]);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTo({
        top: previewRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [page?.markdown]);

  if (!isValidPath || !page) return null;

  const headings = getMarkdownHeadings(page.markdown);

  return (
    <Fragment>
      <div
        ref={previewRef}
        className="flex-1 px-40 py-12 flex-col space-y-2 overflow-auto"
      >
        <MarkdownPreview
          markdown={page.markdown}
          key={contentChanged ? fullPath : "static-preview"}
        />
      </div>
      <div className="w-64">
        <div className="px-4 py-12 flex flex-col space-y-4">
          {headings.length > 0 && (
            <p className="text-base font-medium">On This Page</p>
          )}
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")}`}
              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
              className="text-sm text-muted-foreground hover:underline"
            >
              {heading.text}
            </a>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default EditorPageDynamic;
