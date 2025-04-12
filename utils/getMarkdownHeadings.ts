type MarkdownHeading = {
  level: number;
  text: string;
};

export function getMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: MarkdownHeading[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
    });
  }

  return headings;
}
