/**
 * Diff utility — highlights lines in the editor that are added/changed vs live.
 * (Deletions are not shown — the original design choice, preserved here.)
 */

export interface DiffResult {
  addedLines: number[]; // 0-based line indices to highlight
  addedCount: number;
}

export function computeDiff(mineHtml: string, liveHtml: string): DiffResult {
  const mineLines = mineHtml.split("\n");
  const liveSet = new Set<string>();
  liveHtml.split("\n").forEach((l) => liveSet.add(l.trim()));

  const addedLines: number[] = [];
  mineLines.forEach((l, i) => {
    if (l.trim() && !liveSet.has(l.trim())) addedLines.push(i);
  });
  return { addedLines, addedCount: addedLines.length };
}
