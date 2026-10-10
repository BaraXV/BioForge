/**
 * Built-in starter templates for the "New from Template" picker in the
 * SnippetManager. Each template is plain HTML pre-filled into a new snippet.
 *
 * Templates intentionally avoid z-index (the publish gate rejects it) and
 * keep colors loosely aligned with the forge design tokens so they render
 * cleanly inside the sandboxed preview iframe.
 */

export interface SnippetTemplate {
  /** Stable key used by the store action. */
  key: string;
  /** Human-readable label shown in the picker. */
  label: string;
  /** Short description shown under the label. */
  description: string;
  /** Initial HTML body content for the new snippet. */
  html: string;
}

const TWO_SECTION = `<div style="max-width:680px;margin:0 auto;font-family:Georgia,serif;color:#e8e2de;background:#14101a;padding:18px;border-radius:10px;">
  <div style="text-align:center;border-bottom:1px solid #3a3250;padding-bottom:8px;margin-bottom:12px;">
    <span style="font-size:18px;letter-spacing:0.18em;color:#c4a0e4;">CHARACTER NAME</span>
  </div>
  <div style="margin-bottom:12px;">
    <div style="font-size:11px;letter-spacing:0.14em;color:#d4af55;text-transform:uppercase;margin-bottom:4px;">Section One</div>
    <div style="font-size:13px;line-height:1.55;">Replace this with the first section of your bio.</div>
  </div>
  <div>
    <div style="font-size:11px;letter-spacing:0.14em;color:#d4af55;text-transform:uppercase;margin-bottom:4px;">Section Two</div>
    <div style="font-size:13px;line-height:1.55;">Replace this with the second section of your bio.</div>
  </div>
</div>`;

const CHARACTER_CARD = `<div style="max-width:560px;margin:0 auto;font-family:'Segoe UI',sans-serif;color:#e8e2de;background:#18161e;border:1px solid #3a3250;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#3a3250,#1a1422);padding:16px 18px;">
    <div style="font-size:20px;font-weight:700;color:#eb825a;letter-spacing:0.06em;">Character Name</div>
    <div style="font-size:11px;color:#9691a0;margin-top:2px;letter-spacing:0.12em;text-transform:uppercase;">Tagline / subtitle</div>
  </div>
  <div style="padding:14px 18px;">
    <div style="display:flex;gap:12px;font-size:12px;margin-bottom:12px;">
      <div><span style="color:#d4af55;">Age:</span> <span style="color:#e8e2de;">???</span></div>
      <div><span style="color:#d4af55;">Pronouns:</span> <span style="color:#e8e2de;">they/them</span></div>
      <div><span style="color:#d4af55;">Origin:</span> <span style="color:#e8e2de;">unknown</span></div>
    </div>
    <div style="font-size:11px;letter-spacing:0.14em;color:#c4a0e4;text-transform:uppercase;margin-bottom:4px;">Personality</div>
    <div style="font-size:13px;line-height:1.55;margin-bottom:10px;">A few lines describing temperament, mannerisms, and outlook.</div>
    <div style="font-size:11px;letter-spacing:0.14em;color:#c4a0e4;text-transform:uppercase;margin-bottom:4px;">Background</div>
    <div style="font-size:13px;line-height:1.55;">A few lines describing history and motivations.</div>
  </div>
</div>`;

const RECIPE = `<div style="max-width:520px;margin:0 auto;font-family:'Segoe UI',sans-serif;color:#e8e2de;background:#14101a;border:1px solid #3a3250;border-radius:10px;padding:16px;">
  <div style="font-size:16px;color:#d4af55;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;border-bottom:1px dashed #3a3250;padding-bottom:6px;">Recipe Title</div>
  <ul style="list-style:none;padding:0;margin:0;">
    <li style="display:flex;align-items:baseline;gap:8px;padding:4px 0;font-size:13px;border-bottom:1px solid rgba(58,50,80,0.4);">
      <span style="color:#eb825a;font-weight:700;min-width:18px;">1.</span>
      <span>First ingredient or step</span>
    </li>
    <li style="display:flex;align-items:baseline;gap:8px;padding:4px 0;font-size:13px;border-bottom:1px solid rgba(58,50,80,0.4);">
      <span style="color:#eb825a;font-weight:700;min-width:18px;">2.</span>
      <span>Second ingredient or step</span>
    </li>
    <li style="display:flex;align-items:baseline;gap:8px;padding:4px 0;font-size:13px;border-bottom:1px solid rgba(58,50,80,0.4);">
      <span style="color:#eb825a;font-weight:700;min-width:18px;">3.</span>
      <span>Third ingredient or step</span>
    </li>
    <li style="display:flex;align-items:baseline;gap:8px;padding:4px 0;font-size:13px;">
      <span style="color:#eb825a;font-weight:700;min-width:18px;">4.</span>
      <span>Fourth ingredient or step</span>
    </li>
  </ul>
</div>`;

export const TEMPLATES: Record<string, SnippetTemplate> = {
  blank: {
    key: "blank",
    label: "Blank",
    description: "Empty snippet — start from scratch.",
    html: "",
  },
  two_section: {
    key: "two_section",
    label: "Two-section bio",
    description: "Wrapper + container + two titled sections.",
    html: TWO_SECTION,
  },
  character_card: {
    key: "character_card",
    label: "Character card",
    description: "Name, age, pronouns, personality, background blocks.",
    html: CHARACTER_CARD,
  },
  recipe: {
    key: "recipe",
    label: "Recipe / formatter",
    description: "Styled numbered list bio.",
    html: RECIPE,
  },
};

/** Ordered list of templates for rendering the picker. */
export const TEMPLATE_LIST: SnippetTemplate[] = Object.values(TEMPLATES);
