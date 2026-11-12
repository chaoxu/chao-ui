# Typography

Typography in `chao-ui` is a role-based system for Latin text, regional Chinese text, mathematics, code, and metadata. Choose a coordinated stack for the artifact’s language and rendering engine. Do not ask one fallback chain to make every decision implicitly.

## Default families

| Role | Preferred family | Fallback |
| --- | --- | --- |
| Latin interface and slide text | IBM Plex Sans | system sans serif |
| Simplified Chinese | IBM Plex Sans SC | Source Han Sans SC, Noto Sans CJK SC, PingFang SC |
| Traditional Chinese | IBM Plex Sans TC | Source Han Sans TC, Noto Sans CJK TC, PingFang TC |
| Hong Kong Chinese | Source Han Sans HC | Noto Sans CJK HK, PingFang HK, IBM Plex Sans TC |
| Serif Latin text | IBM Plex Serif | STIX Two Text |
| Serif Simplified Chinese | Source Han Serif SC | Noto Serif CJK SC, Songti SC |
| Serif Traditional Chinese | Source Han Serif TC | Noto Serif CJK TC, Songti TC |
| OpenType mathematics | IBM Plex Math | STIX Two Math, Cambria Math |
| Default interface code | Inconsolata | monospace |
| Slide and technical code | IBM Plex Mono | Inconsolata, monospace |
| Code containing Simplified Chinese | Sarasa Mono SC | Sarasa Fixed SC, Noto Sans Mono CJK SC |
| Code containing Traditional Chinese | Sarasa Mono TC | Sarasa Fixed TC, Noto Sans Mono CJK TC |

The Plex families are the first choice because they preserve the established `chao-ui` character across Latin, Simplified Chinese, Traditional Chinese, monospaced text, and mathematics. Source Han and STIX provide mature coverage when a Plex variant is unavailable or unsuitable for the destination.

## Shared tokens

`theme.css` defines the general font roles:

```css
--pf-font-sans
--pf-font-sans-sc
--pf-font-sans-tc
--pf-font-sans-hc
--pf-font-serif
--pf-font-serif-sc
--pf-font-serif-tc
--pf-font-math
--pf-font-mono
--pf-font-mono-sc
--pf-font-mono-tc
```

`slides.css` maps these to slide-specific roles. Import `theme.css` before `slides.css`.

## Language and regional glyphs

Set an exact language tag on the document or the smallest meaningful region:

```html
<html lang="zh-CN">
<p lang="zh-TW">繁體中文內容</p>
<p lang="zh-HK">香港繁體內容</p>
```

The supported routing is:

- `zh-CN` and `zh-SG` use Simplified Chinese forms.
- `zh-TW` and `zh-MO` use Traditional Chinese forms.
- `zh-HK` uses Hong Kong forms when a dedicated HC or HK font is available.

Japanese and Chinese share many code points but use different regional glyph forms. A Japanese fallback is not an acceptable default for Chinese text.

When one slide contains substantial passages in two Chinese orthographies, tag the passages independently. Do not depend on the deck’s default language to resolve both.

## Weights and emphasis

- Use Regular or Text weight for body copy.
- Use Medium or SemiBold for headings, theorem labels, and primary conclusions.
- Avoid Thin and ExtraLight on projectors or compressed video.
- Use actual installed or delivered weights. Do not depend on synthetic bold.
- Chinese emphasis uses weight, color, spacing, or explicit marks. Synthetic slanted Chinese text is outside the system.
- Preserve mathematical italic for variables and established semantic alphabets.
- Use bold mathematical symbols through the math engine rather than applying CSS font weight to a rendered equation.

Chinese text often needs a little more line height and may need a larger optical size than adjacent English text. Determine the adjustment from the rendered slide rather than applying a fixed percentage to every deck.

## Mathematics

The math font depends on the rendering engine.

### Web and Marp with KaTeX

Keep KaTeX’s bundled font system. KaTeX coordinates text, math italics, symbols, scripts, extensible delimiters, radicals, and operators across several internal fonts. Replacing only its visible text face can break that coordination.

Override KaTeX’s `1.21em` default with `--pf-math-scale: 1.02em` (`theme.css`, `essay.css`, and `slides.css`), matching KaTeX’s `0.6833em` cap-height to IBM Plex’s `0.698em` cap-height so inline variables, numerals, and delimiters read at the same optical size as surrounding prose without disturbing line leading. Route `.katex .cjk_fallback` to the active regional Chinese family (`font-style: normal`).

### OpenType MATH engines

Use IBM Plex Math when the engine supports OpenType MATH, including suitable native MathML, XeTeX, LuaTeX, or other compatible pipelines. STIX Two Math is the fallback and supplies broad scientific and technical coverage.

Test the engine rather than assuming that an installed font will be selected. Equation editors may retain their own default math family.

### Office and Keynote

Prefer native editable equations when they preserve the required symbols and embedding behavior. When the destination cannot reproduce the selected math font reliably, export equations from the authoritative math source as vector graphics and retain the source beside the deck.

Vector fallback must preserve adequate alternative text or a text equivalent in the accompanying document.

## Code and aligned technical text

IBM Plex Mono is the slide default for Latin code. Inconsolata remains the default compact mono face for ordinary `chao-ui` interfaces.

Use Sarasa Mono SC or TC when code, terminals, pseudocode, or fixed-width tables contain Chinese. A Latin mono font followed by a proportional CJK fallback can break columns because the two families do not share a coordinated cell width.

Disable programming ligatures when character identity matters. Test these sequences explicitly:

```text
0 O 1 l I
-> => <= != == ===
() [] {} <> | / \
中文注释  变量名  路径/文件.ts
```

## Delivery and embedding

All preferred families are available under the SIL Open Font License or derive from OFL-licensed families. Verify the license again when changing the source package or distribution.

The reference pages and slide specimen load bundled files through
`fonts.css`. Copy that stylesheet and `vendor/` with the shared styles,
preserving their relative paths. `vendor/manifest.json` records the exact
sources, versions, and hashes. [Third-party notices](../THIRD_PARTY_NOTICES.md)
identify the license files that accompany them.

The bundle includes IBM Plex Sans, Serif, Mono, Sans SC, Sans TC, and Math,
Inconsolata, and Sarasa Mono SC in the weights declared by `fonts.css`.
Source Han, STIX, Sarasa Mono TC, and system fallbacks remain optional
consumer dependencies. Verify and include the families required by the
artifact's language and role.

Pin fonts by source and version in the consuming project. Production slides
should self-host or embed their fonts instead of depending on a live CDN or
the presenting machine. Keep KaTeX's code license and its font notices with
the corresponding files.

CJK font packages are large. The inspected `@ibm/plex-sans-sc` package unpacked to roughly 124 MB because it contains several weights and delivery formats. A product should:

- ship only the required regional family and weights
- prefer WOFF2 for web delivery
- use Unicode-range splits or a verified subset where practical
- preserve the original license notice
- test every required glyph after subsetting
- verify PDF embedding and subsetting with `pdffonts`

The reference specimen uses the bundled files without modifying the host
font library. Its build and deployment paths are documented in
[the slide guide](slides.md).

## Fallback policy

A missing preferred font must be visible during validation. Silent fallback is acceptable only when the fallback is an approved family for the same role and regional orthography.

Do not accept a render merely because every character appears. Check:

- glyph shapes and regional forms
- baseline and cap-height relationships
- stroke weight between Chinese, Latin, and math
- punctuation width and placement
- line wrapping and overflow
- mono column alignment
- equation delimiters, accents, scripts, and operators

## Specimen coverage

The canonical specimen is `specimens/typography-slides.md`. It contains:

- English, Simplified Chinese, and Traditional Chinese
- mixed Chinese and Latin punctuation
- inline and display mathematics
- fractions, roots, sums, integrals, matrices, cases, accents, and semantic alphabets
- a theorem and evidence slide
- Latin code and code with Chinese comments
- font-role and fallback labels

Validate the specimen in browser and PDF outputs whenever a font, engine, theme, or export path changes.

## Sources

These sources and package records were inspected on 2026-08-30:

- [IBM Plex](https://github.com/IBM/plex), including IBM Plex Sans SC, IBM Plex Sans TC, IBM Plex Mono, and IBM Plex Math
- [Source Han Sans](https://github.com/adobe-fonts/source-han-sans)
- [STIX Two](https://github.com/stipub/stixfonts)
- [Sarasa Gothic](https://github.com/be5invis/Sarasa-Gothic)

The inspected npm packages were `@ibm/plex-sans-sc@1.1.0`, `@ibm/plex-sans-tc@1.1.1`, `@ibm/plex-math@1.1.0`, and `@ibm/plex-mono@2.5.0`.
