# Technical & Mathematical Exposition (`essay.css` + `diagrams.js`)

This profile governs long-form technical essays, research blog posts, mathematical surveys, and algorithm explanations. Import `essay.css` after `theme.css`, include `essay.js` for progressive TOC/sidenote/theme enhancement, and build inline or hero figures with `diagrams.js`.

```html
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="essay.css">
<script src="essay.js"></script>
<script type="module" src="diagrams.js"></script>
```

Rendered specimen: [`essay.html`](../essay.html).

The specimen proves the elementary inequality $\lVert x\rVert_2 \le \lVert x\rVert_1$ and defines a bounded polygon for the weighted norm interaction. Its task queues use scripted counts and playback times. Its chart and table use unitless values created as display fixtures, with no algorithm or system performance claim. These fixtures are defined in `essay-demo.js` and labeled in the page, figure captions, and accessible descriptions.

## Reading Architecture

1. **Full-Bleed Top Navigation + Centered Masthead + Wide Hero Stage**:
   - `.pf-essay-topnav` spans full width (`100%`) with tracked quiet serif brand (`letter-spacing: 0.08em`, `weight: 400`), borderless navigation links, and a bare `☾` / `☀` theme button (`[data-pf-theme-toggle][data-pf-theme-short]`).
   - `.pf-essay-masthead` centers the weight-`400` serif title (`2.125rem` / `34px`), optional deck, and calm serif byline (`42rem` max).
   - `.pf-essay-hero` widens to `51rem` (`816px`) to place related diagrams or traces side by side before the prose.
2. **Symmetric 3-Column Grid (`.pf-essay-grid`)**:
   - `minmax(10.5rem, 15.5rem)` left rail + `minmax(0, 40.5rem)` prose column + `minmax(10.5rem, 15.5rem)` right margin rail inside `86rem`.
   - **Left rail (`.pf-essay-toc`)**: A sticky scroll-spy TOC (`0.79rem` serif, no box or vertical border, no uppercase header). The active section receives `600` weight in `--pf-essay-fg`. When `.pf-essay-toc` is left empty (e.g. Pandoc/Hakyll templates), `essay.js` prepends `"Introduction"` (`"引言"` on `zh` pages) and builds the TOC automatically from section headings (`>= 2` sections), stripping Pandoc `.header-section-number` prefixes.
   - **Center column (`.pf-essay-prose`)**: `15.5px` (`0.96875rem`) `IBM Plex Serif` + `STIX Two Text` for Latin prose (`line-height: 1.62`, matching `Palatino` `17px` visual x-height) coordinated with `Source Han Serif SC` / `TC` for Chinese (`line-height: 1.74`, bold emphasis without synthetic slant). KaTeX scales at `1.02em` (`--pf-essay-math-scale`) so inline formulas match `IBM Plex Serif` cap-height (`0.698 / 0.6833 = 1.0215`) rather than KaTeX's `1.21em` default. Serif headings use weight `400` (`1.52rem` `h2`, `1.2rem` `h3`). Paragraphs have no first-line indent. Links use `1px dotted` underlines, and tables use tabular numerals. The theorem and proof environments (`.pf-theorem` and Pandoc/Hakyll `.theorem-environment`) have square corners.
   - **Right rail (`.pf-essay-sidenotes`)**: Author footnotes in standard Markdown (`[^1]`). Above `1180px`, `essay.js` clones footnotes into vertically aligned, collision-avoiding margin sidenotes (`0.79rem` serif, footnote index stacked cleanly above note text) and hides the bottom endnote list. Narrower viewports show standard endnotes.

## Analytical Diagram Rules (`diagrams.js`)

Figures must look like native mathematical ink on the page rather than pasted screenshots or dashboard widgets:

1. **Unboxed by Default**:
   - Place `<canvas>` inside `<figure class="pf-diagram">`. Use `1px` `--pf-vis-grid` hairlines for axes and baselines, with no outer border around coordinate plots or bar charts. Use `panel()` (`0px` square frame) only for terminal/token trace windows.
2. **Live CSS Token Synchronization**:
   - Call `palette(canvas)` inside `draw()` (never hardcode `#ffffff` or `#000000`). Switching `<html data-theme="dark">` re-renders every mounted diagram automatically.
3. **Strict 3-Pigment Semantic Grammar**:
   - Map colors consistently across every figure in an article:
     - `--pf-vis-slate` (`P.slate`) — constructive / feasible / productive / primary method
     - `--pf-vis-terracotta` (`P.terracotta`) — adversarial / looping / violated cut / bottleneck
     - `--pf-vis-ochre` (`P.ochre`) — intermediate / auxiliary / negative weight / approximation
     - `--pf-vis-stone` (`P.stone`) — unedited baseline
4. **Identify Data and Mathematical Claims**:
   - For empirical plots, retain the source logs or dataset, units, and measurement conditions. Keep those sources with the figure.
   - Label illustrative data in captions and accessible descriptions, including scripted traces and animation timing. Use neutral series names when values serve only to demonstrate a chart.
   - Define the equations used by geometric interactions (`feasiblePolygon`, `lineInBox`, `arrow`). State the assumptions of mathematical claims and provide their proof or source.
5. **Respect Cognitive Rhythm & Autonomy**:
   - `mountDiagram` starts episodes only when scrolled into view (`IntersectionObserver`), pauses off-screen loops, jumps to `reduceAt` under `prefers-reduced-motion: reduce`, exposes `pointer` coordinates for live parameter scrubbing, and binds `[data-diagram-toggle]` for explicit Pause / Play control.
