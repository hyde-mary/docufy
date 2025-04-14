export function getMarkdownHeadings(
  markdown: string
): { text: string; level: number; id: string }[] {
  const lines = markdown.split("\n");
  const headings: { text: string; level: number; id: string }[] = [];
  const idCounters: Record<string, number> = {};

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

      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      idCounters[id] = (idCounters[id] || 0) + 1;
      if (idCounters[id] > 1) {
        id = `${id}-${idCounters[id] - 1}`;
      }

      headings.push({ text, level, id });
    }
  }

  return headings;
}
