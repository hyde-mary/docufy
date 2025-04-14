"use client";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { memo } from "react";

type MarkdownPreviewProps = {
  markdown: string;
  className?: string;
};

const MarkdownPreview = ({
  markdown,
  className = "",
}: MarkdownPreviewProps) => {
  return (
    <div className={`markdown-preview w-full ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSlug]}
        components={{
          // headings
          h1: ({ ...props }) => {
            return (
              <h1
                className="text-4xl md:text-5xl font-bold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },
          h2: ({ ...props }) => {
            return (
              <h2
                className="text-3xl md:text-4xl font-bold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },
          h3: ({ ...props }) => {
            return (
              <h3
                className="text-2xl md:text-3xl font-bold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },
          h4: ({ ...props }) => {
            return (
              <h4
                className="text-xl md:text-2xl font-semibold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },
          h5: ({ ...props }) => {
            return (
              <h5
                className="text-lg md:text-xl font-semibold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },
          h6: ({ ...props }) => {
            return (
              <h6
                className="text-base md:text-lg font-semibold my-4 md:my-6 scroll-mt-20"
                {...props}
              />
            );
          },

          // paragraphs
          p: ({ children, ...props }) => (
            <p
              className="text-base leading-relaxed my-4 break-words"
              {...props}
            >
              {children}
            </p>
          ),

          // ul
          ul: ({ children, ...props }) => (
            <ul className="my-4 pl-4 md:pl-6 list-disc" {...props}>
              {children}
            </ul>
          ),

          // ol
          ol: ({ children, ...props }) => (
            <ol className="my-4 pl-4 md:pl-6 list-decimal" {...props}>
              {children}
            </ol>
          ),

          // list
          li: ({ children, ...props }) => (
            <li className="my-2 pl-1" {...props}>
              {children}
            </li>
          ),

          // Inline Code
          code: ({ children, ...props }) => {
            return (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-words"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Block Code
          pre: ({ children, ...props }) => (
            <div className="max-w-full overflow-hidden">
              <pre
                className="bg-gray-900 p-2 md:p-4 overflow-x-auto max-w-full"
                style={{ WebkitOverflowScrolling: "touch" }}
                {...props}
              >
                {children}
              </pre>
            </div>
          ),

          // Links
          a: ({ ...props }) => (
            <a
              className="text-blue-500 hover:text-blue-600 hover:underline underline-offset-4 transition-colors break-words"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 dark:text-gray-400 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),

          // Images
          img: ({ src, alt = "", ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src || ""}
              alt={alt}
              className="rounded-lg max-w-full h-auto my-4"
              loading="lazy"
              {...props}
            />
          ),

          // Tables
          table: ({ children, ...props }) => (
            <div className="max-w-full overflow-hidden my-4">
              <div
                className="overflow-x-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <table className="min-w-full border-collapse" {...props}>
                  {children}
                </table>
              </div>
            </div>
          ),

          th: ({ children, ...props }) => (
            <th
              className="border px-2 py-1 md:px-4 md:py-2 text-left bg-gray-100 dark:bg-gray-800"
              {...props}
            >
              {children}
            </th>
          ),

          td: ({ children, ...props }) => (
            <td className="border px-2 py-1 md:px-4 md:py-2" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default memo(
  MarkdownPreview,
  (prevProps, nextProps) => prevProps.markdown === nextProps.markdown
);
