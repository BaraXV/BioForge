/**
 * Linter — checks bio HTML against JanitorAI sanitizer rules and "house doctrine".
 *
 * Returns a list of problems (empty = clean).
 *
 * BUGFIX vs original:
 *  - The position: regex now uses a negative lookbehind for `-` so it does NOT
 *    match `background-position:` (the original relied on a `[;"'\s]` prefix
 *    which failed for `transition:position` and similar edge cases).
 */

export interface LintProblem {
  message: string;
  severity: "error" | "warning";
}

export function lint(html: string): LintProblem[] {
  const problems: LintProblem[] = [];

  if (/<style[\s>]/i.test(html)) {
    problems.push({ message: "<style> — stripped by server.", severity: "error" });
  }
  if (/<script[\s>]/i.test(html)) {
    problems.push({ message: "<script> — stripped by server.", severity: "error" });
  }
  // BUGFIX: negative lookbehind for `-` prevents matching `background-position:`
  if (/(?<![a-z-])position\s*:/i.test(html)) {
    problems.push({ message: "position: — stripped.", severity: "error" });
  }
  if (/z-index/i.test(html)) {
    problems.push({ message: "z-index — stripped badly.", severity: "error" });
  }
  if (/width\s*:\s*100vw/i.test(html)) {
    problems.push({ message: "width:100vw — overflow risk.", severity: "warning" });
  }

  const o = (html.match(/<div/g) || []).length;
  const c = (html.match(/<\/div>/g) || []).length;
  if (o !== c) {
    problems.push({
      message: `Unbalanced <div>: ${o} open, ${c} close.`,
      severity: "error",
    });
  }

  const p = (html.match(/<p[\s>]/g) || []).length;
  const pc = (html.match(/<\/p>/g) || []).length;
  if (p !== pc) {
    problems.push({
      message: `Unbalanced <p>: ${p} open, ${pc} close.`,
      severity: "error",
    });
  }

  if (html.length > 3000) {
    const gridRe = /grid-template-columns\s*:\s*([^;"]+)/g;
    let g: RegExpExecArray | null;
    let fixedGrids = 0;
    while ((g = gridRe.exec(html)) !== null) {
      if (g[1].indexOf("auto-fit") === -1 && g[1].indexOf("auto-fill") === -1) {
        fixedGrids++;
      }
    }
    if (fixedGrids > 0) {
      problems.push({
        message: `${fixedGrids} fixed grid(s) — not responsive.`,
        severity: "warning",
      });
    }
  }

  return problems;
}
