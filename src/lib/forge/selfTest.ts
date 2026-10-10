/**
 * Self-Test suite — known-answer tests for the block mapper, color parser,
 * formatter, and live editor state. Ported from the original v7 suite.
 */

import { buildBlockMap, getJumpList, jumpCount } from "./blockMapper";
import { parseColor } from "./colorUtils";
import { formatSource } from "./formatter";
import { THEMES } from "./themes";

export interface TestResult {
  group: string;
  name: string;
  pass: boolean;
  detail: string;
}

export interface SelfTestReport {
  results: TestResult[];
  passed: number;
  total: number;
  allNominal: boolean;
  text: string;
}

export function runSelfTest(opts: {
  editorHtml: string;
  previewLabeledCount: number;
  previewWired: boolean;
  previewAccessible: boolean;
}): SelfTestReport {
  const results: TestResult[] = [];
  let group = "";
  const setGroup = (g: string) => {
    group = g;
  };
  const check = (name: string, pass: boolean, detail = "") => {
    results.push({ group, name, pass: !!pass, detail });
  };

  // ===== Mapper — known-answer documents =====
  setGroup("Mapper — known-answer documents");

  const docA = '<div a>\ntext\n</div>\n<p>one</p>\n<div b>\n<div>nested</div>\n</div>';
  const mA = buildBlockMap(docA);
  check("A: 3 top-level blocks", mA.top.length === 3, "found " + mA.top.length);
  check("A: block 2 (<p>) at line 3", !!mA.top[1] && mA.top[1].line === 3, "got " + (mA.top[1]?.line ?? "?"));
  check("A: block 3 at line 4", !!mA.top[2] && mA.top[2].line === 4, "got " + (mA.top[2]?.line ?? "?"));

  const docB = '<div\nstyle="color:red;">\ntext\n</div>\n<div>two</div>';
  const mB = buildBlockMap(docB);
  check("B: multi-line tag at line 0", mB.top.length === 2 && mB.top[0].line === 0, "blocks=" + mB.top.length + " line0=" + (mB.top[0]?.line ?? "?"));
  check("B: second block at line 4", !!mB.top[1] && mB.top[1].line === 4, "got " + (mB.top[1]?.line ?? "?"));

  const docC = '<!-- note -->\n<div>x</div>';
  const mC = buildBlockMap(docC);
  check("C: comment NOT counted (1 block)", mC.top.length === 1, "found " + mC.top.length);
  check("C: div at line 1", !!mC.top[0] && mC.top[0].line === 1, "got " + (mC.top[0]?.line ?? "?"));

  const docD = '<div>\n<img src="x"><br>\n<hr>\n</div>\n<div>y</div>';
  const mD = buildBlockMap(docD);
  check("D: void tags, 2 top blocks", mD.top.length === 2, "found " + mD.top.length);

  const docE = '<div title="a > b">\ntext\n</div>\n<div>z</div>';
  const mE = buildBlockMap(docE);
  check('E: quoted ">", 2 top blocks', mE.top.length === 2, "found " + mE.top.length);

  const docF = '<div wrap>\n<div a>x</div>\n<p>b</p>\n<div c>\n<div>deep</div>\n</div>\n</div>';
  const mF = buildBlockMap(docF);
  check("F: single wrapper detected", mF.top.length === 1, "top=" + mF.top.length);
  const jlF = getJumpList(docF);
  check("F: jump list = wrapper + 3 sections (4)", jlF.length === 4, "jumpList=" + jlF.length);

  // Doc G: the actual house format
  const docG = '<div bg>\n<div container>\n<div a>x</div>\n<p>b</p>\n<div c>y</div>\n</div>\n</div>';
  const jlG = getJumpList(docG);
  check(
    "G: two-wrapper house format, sections at depth 2",
    jlG.length === 4 && jlG[1].line === 2 && jlG[2].line === 3 && jlG[3].line === 4,
    "jumpList=" + jlG.length + " lines=" + jlG.map((j) => j.line).join(","),
  );

  // ===== Real Content — actual editor state =====
  setGroup("Real Content — actual editor state");

  const realHtml = opts.editorHtml;
  const hasReal = realHtml.trim().length > 0;
  check("Editor has content to test", hasReal, "editor empty — paste a bio, refresh, re-test");

  if (hasReal) {
    const realMap = buildBlockMap(realHtml);
    const realJumps = getJumpList(realHtml);
    const realLines = realHtml.split("\n").length;

    check("Mapper finds top-level elements", realMap.top.length >= 1, "top=" + realMap.top.length);
    check(
      "Jump list has more than 1 entry (sections detected)",
      realJumps.length > 1,
      "jumpList=" + realJumps.length + " — if 1, mapper sees only the wrapper",
    );

    let allLinesValid = true;
    let badLine = "";
    for (let ji = 0; ji < realJumps.length; ji++) {
      if (realJumps[ji].line < 0 || realJumps[ji].line >= realLines) {
        allLinesValid = false;
        badLine = "jump[" + ji + "]=line " + realJumps[ji].line + " (editor has " + realLines + " lines)";
        break;
      }
    }
    check("All jump lines valid", allLinesValid, badLine);

    let ordered = true;
    let bad = -1;
    for (let jo = 1; jo < realJumps.length; jo++) {
      if (realJumps[jo].line < realJumps[jo - 1].line) {
        ordered = false;
        bad = jo;
        break;
      }
    }
    check(
      "Jump lines in document order",
      ordered,
      ordered ? "" : "jump[" + bad + "]=line " + realJumps[bad].line + " < line " + realJumps[bad - 1].line,
    );

    if (opts.previewAccessible) {
      check(
        "Preview sections labeled (data-forge-idx)",
        opts.previewLabeledCount > 0,
        "found " + opts.previewLabeledCount + " — if 0, click Refresh Preview and re-test",
      );
      check(
        "Labeled count matches jump list",
        opts.previewLabeledCount === realJumps.length,
        "labeled=" + opts.previewLabeledCount + " / jumpList=" + realJumps.length,
      );
      check(
        "Click handler attached",
        opts.previewWired === true,
        "wirePreviewClicks did not set __forgeWired — Refresh Preview, re-test",
      );
    } else {
      check("Preview accessible", false, "iframe not reachable — Refresh Preview, re-test");
    }

    const jumpLines = realJumps.map((j) => j.line).join(",");
    check(
      "DIAGNOSTIC: jump list summary",
      true,
      realJumps.length +
        " sections at lines [" +
        (jumpLines.length > 80 ? jumpLines.substring(0, 80) + "..." : jumpLines) +
        "]",
    );
  }

  // ===== System =====
  setGroup("System");

  check(
    "All four themes defined",
    !!(THEMES.gothic && THEMES.gold && THEMES.ember && THEMES.minimal),
    "missing theme",
  );

  const testKey = "forge-st-" + Date.now();
  try {
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    check("Vault writable", true);
  } catch (e) {
    check("Vault writable", false, e instanceof Error ? e.message : String(e));
  }

  const pc1 = parseColor("#ff0000");
  const pc2 = parseColor("rgb(1, 2, 3)");
  const pc3 = parseColor("#abc");
  const pc4 = parseColor("rgba(1,2,3,0.5)");
  check(
    "Color parser: hex6 / rgb / hex3 / rgba-with-alpha",
    !!pc1 && pc1[0] === 255 && !!pc2 && pc2[1] === 2 && !!pc3 && pc3[0] === 170 && !!pc4 && pc4.length === 4 && pc4[3] === 0.5,
    "parsed " + JSON.stringify([pc1, pc2, pc3, pc4]),
  );

  const beforeJumps = jumpCount(opts.editorHtml);
  const formattedNow = formatSource(opts.editorHtml);
  const afterJumps = getJumpList(formattedNow).length;
  check(
    "Format preserves section count",
    beforeJumps === afterJumps,
    "before " + beforeJumps + " / after " + afterJumps,
  );

  const entityDoc = "<div>&#9670; &#128302;</div>";
  const fmtEntity = formatSource(entityDoc);
  check(
    "Format preserves numeric entities",
    fmtEntity.indexOf("&#9670;") !== -1 && fmtEntity.indexOf("&#128302;") !== -1,
    "entities corrupted: " + fmtEntity,
  );

  // ===== Build report =====
  const passed = results.filter((r) => r.pass).length;
  const lines: string[] = [
    `FORGE SELF-TEST v8 — ${passed}/${results.length} passed`,
    "",
  ];
  let cg = "";
  for (const r of results) {
    if (r.group !== cg) {
      cg = r.group;
      lines.push("", "### " + r.group);
    }
    lines.push(`${r.pass ? "PASS" : "FAIL"} — ${r.name}${r.detail ? "  (" + r.detail + ")" : ""}`);
  }
  lines.push(
    "",
    passed === results.length
      ? "ALL SYSTEMS NOMINAL"
      : "FAILURES DETECTED — see details above.",
  );

  return {
    results,
    passed,
    total: results.length,
    allNominal: passed === results.length,
    text: lines.join("\n"),
  };
}
