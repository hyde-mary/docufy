export function getMarkdownHeadings(
  markdown: string
): { text: string; level: number }[] {
  const lines = markdown.split("\n");
  const headings: { text: string; level: number }[] = [];

  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ text, level });
    }
  }

  return headings;
}
