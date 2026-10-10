/**
 * Few-shot example bio for the generator prompt.
 *
 * This is a condensed version of a real high-quality JanitorAI bio (the
 * "Oceanus University" co-living bio). Including this in the system prompt
 * teaches the LLM what "good" actually looks like — the voice, the CSS
 * techniques, the section flow, the personality, the affection meters.
 *
 * The LLM copies patterns from examples far better than from descriptions.
 */

export const FEWSHOT_EXAMPLE = `<div style="--acc:#2fb8a8;--acc2:#7fe3d3;--bg:#05090a;--card:#0a1416;--line:rgba(47,184,168,.35);--txt:#e6f1ef;--mut:#86a39f;width:min(100%,52rem);margin:0 auto;border-radius:1rem;overflow:hidden;background:var(--bg);color:var(--txt);border:1px solid var(--line);font-family:Inter,system-ui,sans-serif;">
<div style="padding:1rem 1.1rem 1.4rem;">

<!-- HOOK: hero image with gradient overlay + tagline, using grid stacking -->
<div style="display:grid;grid-template-columns:1fr;">
<div style="grid-area:1/1;min-height:15rem;background-image:url('https://ella.janitorai.com/media-approved/HERO.webp');background-size:cover;background-position:center 25%;"></div>
<div style="grid-area:1/1;background:radial-gradient(circle at 85% 10%,rgba(47,184,168,.35),transparent 40%),linear-gradient(to top,#05090a 4%,rgba(5,9,10,.15) 65%);"></div>
<div style="grid-area:1/1;align-self:end;padding:1.1rem 1.2rem;">
<div style="margin-top:.4rem;font-size:.72rem;letter-spacing:.2em;color:var(--acc2);">OCEANUS UNIVERSITY · CO-LIVING PROGRAM · SUITE 404</div>
</div>
</div>

<!-- INTRO: bordered callout, 150+ words, conversational/theatrical voice -->
<div style="padding:1rem;border-left:3px solid var(--acc);border-radius:0 .85rem .85rem 0;background:rgba(47,184,168,.07);font-size:.88rem;line-height:1.8;">
<strong style="color:var(--acc2);">[ ATTENTION, RESIDENT OF SUITE 404 ]</strong><br>
Okay. Deep breath. You have lived in this suite for an ENTIRE YEAR. Quiet mornings. Total command of the thermostat. Nobody touching your snacks. Treasure that memory, because it is about to be taken out back and gently retired.<br><br>
This semester, Oceanus University launched the Co-Living Program, and its room-matching computer apparently chose names by throwing darts at a fish tank. The result: one sun-worshipping crocodile and one rule-worshipping shark, both being delivered to YOUR door. Neither will move out. I asked. I asked nicely. One of them yawned. The other handed me a laminated form.<br><br>
The Housing Office's grand solution was to give YOU a badge. Habitat Warden! Reduced rent, extra credits, and one thermostat key.<br><br>
Anyway! Don't play favorites, don't lose the key, and for the love of ExusiaiZ, just have fun. Go! Shoo!
</div>

<!-- Section divider -->
<div style="margin:1.6rem 0 .8rem;text-align:center;font-size:.7rem;font-weight:800;letter-spacing:.35em;color:var(--acc);">❖ CO-LIVING PROGRAM ❖</div>

<!-- ABOUT: bordered card explaining the setting -->
<div style="padding:.9rem;border:1px solid var(--line);border-radius:.8rem;background:var(--card);font-size:.85rem;line-height:1.75;">
<strong style="color:var(--acc2);">So what even is it?</strong><br>
Oceanus is a university built for aquatic and amphibious Demi-Humans, so picture pools, steam rooms, and a whole water park where other schools keep their parking lots. The Co-Living Program is a pilot experiment: put predator-blooded students and gentle-species students under the same roof, then watch to see if anyone starts a feud over the last fish cracker.<br><br>
<strong style="color:var(--acc2);">The one thing you need to know:</strong> aquatic students go slow and sleepy when the air gets dry, then bounce right back around water or humidity. Everyone, you included, wears light, quick-drying, swimwear-style outfits, so nobody here has ever said the words "dress code" with a straight face.
</div>

<!-- CHARACTERS: details blocks with portraits + affection meters -->
<div style="margin:1.6rem 0 .8rem;text-align:center;font-size:.7rem;font-weight:800;letter-spacing:.35em;color:var(--acc);">❖ THE RESIDENTS OF 404 ❖</div>
<div style="display:grid;gap:.6rem;">
<details open style="border:1px solid var(--line);border-left:3px solid #7ac05c;border-radius:.85rem;background:var(--card);padding:.8rem;" name="char-1">
<summary style="cursor:pointer;list-style:none;display:flex;align-items:center;gap:.6rem;">
<div style="flex:1;min-width:0;">
<div style="font-weight:850;color:#9ad27a;">✦ Tomoe</div>
<div style="font-size:.7rem;color:var(--mut);">20 · Saltwater Crocodile · Amphibious Engineering</div>
</div>
<span style="color:var(--acc);">▾</span>
</summary>
<div style="margin-top:.8rem;display:flex;flex-wrap:wrap;gap:.9rem;">
<div style="flex:0 0 11rem;max-width:100%;aspect-ratio:2/3;background-image:url('https://ella.janitorai.com/media-approved/TOMOE.webp');background-size:cover;background-position:center;border-radius:.7rem;border:1px solid var(--line);"></div>
<div style="flex:1 1 12rem;min-width:0;font-size:.85rem;line-height:1.75;">
Lazy, sly, and always chasing the sunniest spot in the room. She sneaks the thermostat up whenever nobody's looking, and she's decided you make a pretty good warm spot too.
<div style="margin-top:.6rem;font-size:.7rem;color:var(--mut);">Toward you: quietly fond</div>
<div style="margin-top:.3rem;height:4px;background:rgba(255,255,255,.08);border-radius:4px;">
<div style="width:5%;height:100%;background:var(--acc);border-radius:4px;"></div>
</div>
</div>
</div>
</details>
</div>

<!-- CTA -->
<div style="margin-top:1.6rem;text-align:center;">
<a href="#" style="display:inline-block;padding:.7rem 1.4rem;border:1px solid var(--acc);border-radius:999px;background:rgba(47,184,168,.12);color:var(--acc2);font-size:.75rem;font-weight:800;letter-spacing:.15em;text-decoration:none;">JOIN THE DISCORD →</a>
<div style="margin-top:.8rem;font-size:.65rem;letter-spacing:.2em;color:var(--mut);">CREATED BY EXUSIAIZ</div>
</div>

</div>
</div>`;

export const FEWSHOT_NOTE = `Here is an EXAMPLE of a high-quality bio. Study its techniques:
- The INTRO uses a theatrical second-person narrator voice ("Okay. Deep breath. You have lived in this suite for an ENTIRE YEAR.") — it's conversational, specific, and funny. Copy this ENERGY, not these exact words.
- Characters have personality in their descriptions ("Lazy, sly, and always chasing the sunniest spot") — not trait lists.
- The affection meter is at a LOW percentage (5%) — realistic for a first meeting, not 50%+.
- CSS uses var(--acc) everywhere, with creative techniques like grid-stacking for the hero overlay.
- Section dividers use ❖ with letter-spacing for a polished feel.

Your output should match this QUALITY LEVEL — the voice, the specificity, the personality, the CSS craft. Do not produce generic, flat, boilerplate prose.`;
