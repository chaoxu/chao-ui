# Slides

Slides are a time-based `chao-ui` artifact. Read `docs/experience-principles.md` and `docs/typography.md` before selecting a deck profile or writing slide CSS.

The deck should preserve one visual grammar while changing composition according to each slide’s purpose. Consistency comes from typography, grid, spacing, color semantics, evidence treatment, and rhythm. It does not require one repeated layout or a single editorial profile.

## Deck brief

Record these decisions before making slides:

```text
Purpose and required outcome:
Audience, expertise, and language:
Venue, projection conditions, and remote delivery:
Talk duration and expected pace:
Narrative sections and transitions:
Evidence, mathematics, code, and demonstrations:
Live deck, handout, and archival outputs:
Selected profile or justified deviations:
```

## Slide roles

| Role | Design responsibility | Typical treatment |
| --- | --- | --- |
| Title | establish subject, speaker, context, and expectation | direct title with restrained identity or one justified key visual |
| Orientation | show the question, map, vocabulary, or boundary | high fluency, familiar structure, limited detail |
| Main claim | state the sentence the audience should retain | claim-led title with one supporting representation |
| Explanation | reveal mechanism, sequence, relationship, or proof idea | diagram, staged derivation, comparison, or annotated example |
| Evidence | support a claim with inspectable material | chart, table, quotation, equation, result, or source with minimal decoration |
| Code or mathematics | preserve exact symbolic content | native code or math rendering with adequate size and surrounding explanation |
| Section transition | reset attention and establish rhythm | sparse composition, optional alternate field or key visual |
| Decision | expose conclusion, consequence, and required action | direct hierarchy with alternatives and next step visible |
| Closing | preserve the durable outcome and retrieval path | concise synthesis, references, contact, or artifact link |

Scientific editorial is appropriate for a title, transition, conceptual centerpiece, or closing when wonder, gravity, or controlled ambiguity fits the content. Evidence, derivation, and decision slides normally use the standard light interface profile.

## Shared grammar

Hold these decisions stable across a deck:

- type families and regional language routing
- title position and hierarchy
- outer margins and alignment grid
- slide numbering and section labels
- chart, table, theorem, code, and source treatment
- functional color meanings
- border weight and square geometry
- transition behavior and motion limits

Vary density and composition when the role changes. A transition slide and a proof slide should belong to the same deck without pretending to perform the same task.

## Attribution

Use a source-name link for the usual source line: "Epoch AI", "MathArena", "Ong et al. 2024". Put retrieval dates, rate cards, and detailed method notes in speaker notes or a companion document. Keep qualifications that the audience needs to interpret the claim on the slide. Preserve any attribution, copyright notice, or license text required by the material's terms, including visible credit when required. This visual preference does not override those terms.

## Titles and naming

Slide titles are conceptual interfaces. Prefer a descriptive or claim-led title that helps the audience classify the slide during its first exposure.

Headings run the full content width and wrap only when they exceed it. Keep a title short enough for one line rather than relying on a width cap to balance it.

- Use a topic label when the slide introduces a stable section or vocabulary.
- Use a full claim when the slide presents evidence or a conclusion.
- Use an elaborative title when the audience has time and context to interpret it.
- Keep jokes, metaphors, and literary titles only when they preserve the slide’s subject and retrieval value.
- Retain stable names for recurring objects, lemmas, algorithms, datasets, and systems.

The audience should be able to reconstruct the deck’s argument from its title sequence.

## Chinese and mixed-language slides

Set the deck or content region to `zh-CN`, `zh-TW`, or `zh-HK`. Use the corresponding typography token from `slides.css`.

- Give Chinese prose enough line height for dense glyph shapes and punctuation.
- Keep paragraphs shorter than document prose.
- Avoid synthetic Chinese italics.
- Keep English abbreviations and mathematical variables visually distinct without changing their meaning.
- Test line breaks around Chinese punctuation, inline math, URLs, and Latin identifiers.
- Use the same regional glyph policy in diagrams and SVG assets.

When a deck changes language between sections, tag each slide or region. A single global fallback order cannot choose both Simplified and Traditional forms correctly.

## Mathematics

Use semantic source mathematics and a coordinated math engine. The current Marp workflow uses KaTeX and should retain KaTeX’s bundled fonts.

Each mathematical slide should expose:

- the object being discussed
- the active claim or transformation
- the assumptions needed at that moment
- the visual reading order
- the relationship between notation and spoken explanation

Do not shrink an equation to preserve an overfull slide. Split the argument across slides, introduce notation earlier, or move secondary detail to the handout.

Use progressive revelation only when each intermediate state is mathematically meaningful. The final exported PDF must contain a complete readable state without depending on animation.

The shared theme respects the viewer's reduced-motion setting by default. For a presentation that explicitly requests full motion, add `pf-slide-motion-full` to its `.pf-slides` container or `section.pf-slide` to retain the authored animation timings. In Marp, include the class in both the default `class` directive and any local `_class` directive on an animated slide.

## Code

Use IBM Plex Mono for Latin code. Use `pf-code-cjk` or `pf-code-cjk-sc` for Sarasa Mono SC, and `pf-code-cjk-tc` for Sarasa Mono TC when Chinese comments, filenames, paths, or table cells must align.

- Keep code lines short enough for the slide width.
- Highlight the active line through weight, border, or restrained color.
- Preserve exact punctuation and case.
- Disable ligatures when they obscure character identity.
- Put setup and output on separate slides when both cannot remain legible.

## Evidence and truthfulness

Evidence slides use native charts, tables, equations, quotations, images, and citations. Decoration must not impersonate measurement.

- keep axes, units, sample size, uncertainty, and comparison baselines visible
- cite the source on the slide where the claim appears
- distinguish measured, derived, estimated, and illustrative values
- preserve aspect ratio and relevant context when cropping images
- avoid color scales and animation that exaggerate change
- keep generated imagery outside the evidence layer

## Rhythm and time

Design the talk as a sequence of perceptual episodes:

- a slide’s subject should be recognizable immediately
- explanation may unfold after orientation is stable
- transitions should reset attention rather than add another argument
- repeated layouts create rhythm when their information role repeats
- pauses and blank space can separate claims more effectively than decorative dividers

Do not turn the three-second temporal-integration research into a fixed slide duration. Use it as evidence that sequencing and continuity deserve testing.

## Output contract

HTML is the canonical presentation artifact. The source, theme, components, and assets compile to the live webpage first. The same build exports a PDF derivative and publishes only after both outputs pass their gates.

| Output | Responsibility |
| --- | --- |
| HTML | projection, navigation, fragments, motion, links, presenter controls, demonstrations, and interactive components |
| PDF | offline fallback, handout, archive, printing, reimbursement evidence, and a stable record of the talk |

Keep projected text concise and legible at distance. Place dense derivations, full citations, and supplementary tables in notes or a companion document. The PDF must remain understandable without spoken transitions, embed or subset every font, and preserve stable links and identifiers.

## Dynamic slides

Interactive behavior runs entirely in the browser by default. A slide may depend on a live server when the connection is part of the demonstration, and it must retain a static fallback.

- every fragment or animation has a deterministic final state for PDF export
- every control is keyboard accessible and remains comprehensible with reduced motion
- data-driven graphics expose their source and units instead of presenting animation as evidence
- failures in a dynamic component stay local to that slide and preserve the surrounding deck
- the published bundle includes every relative asset required for offline presentation

Marp remains the default source format for narrative decks, mathematics, fragments, and SVG choreography. Move to a native-DOM deck only when parameter controls, simulations, or embedded applications are recurring requirements. HTMX belongs in a slide only when live server exchange is part of the demonstration. Client-side JavaScript or Web Components are the default for local interactive islands.

## Reusable CSS

Import the shared styles in this order:

```css
@import url("theme.css");
@import url("slides.css");
```

Scope a generic deck with `.pf-slides`. For Marp, apply the `pf-slide` class to each generated `section`.

Register `slides.css` as a Marp theme instead of importing it through the deck's `style` block. Marp's generated theme selectors otherwise outrank ordinary imported CSS. Set `theme: chao-ui` in the deck front matter. The slide theme carries canonical fallback values for standalone Marp builds and consumes `theme.css` variables when a surrounding product provides them. `marp.config.json` points KaTeX to the bundled fonts and assumes generated artifacts are in `output/`. Build the canonical specimen with:

```sh
npx --yes @marp-team/marp-cli@4.5.1 specimens/typography-slides.md --config-file marp.config.json --theme-set slides.css --html --allow-local-files --output output/typography-slides.html
npx --yes @marp-team/marp-cli@4.5.1 specimens/typography-slides.md --config-file marp.config.json --theme-set slides.css --html --allow-local-files --pdf --output output/typography-slides.pdf
```

Reusable classes include:

```text
pf-slide
pf-slide-sc
pf-slide-tc
pf-slide-hc
pf-zh-sc
pf-zh-tc
pf-zh-hc
pf-code-cjk
pf-code-cjk-sc
pf-code-cjk-tc
pf-slide-grid
pf-slide-panel
pf-slide-theorem
pf-slide-kicker
pf-slide-claim
pf-slide-source
pf-slide-meta
```

## Specimen and validation

`specimens/typography-slides.md` is the canonical mixed-language and mathematics specimen. It uses the local font files declared in `fonts.css`. Keep generated HTML and PDF together in `output/` so the specimen's relative stylesheet paths resolve. For deployment, include those stylesheets and `vendor/`, or rewrite the paths for the destination. Production decks must pin and self-host or embed the selected families and preserve their notices.

Marp is the retained Node runtime contract for this slide source format. It does not establish Node as the general `chao-ui` automation runtime.

Validate a changed deck through:

- source review and `git diff --check`
- browser rendering with console and network inspection
- a desktop screenshot at presentation dimensions
- PDF export and page rendering to PNG
- `pdffonts` inspection for embedding and substitution
- visual inspection of Chinese regional forms, math delimiters, code alignment, overflow, and source lines
- a render on each browser and operating system used for presentation

The browser and PDF must show the same reading order, complete content, and approved font roles before release.
