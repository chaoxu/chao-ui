# chao-ui

`chao-ui` is a visual design system for websites, applications, dashboards, technical essays, slides, posters, covers, and research graphics. It combines reusable CSS and browser components with guidance on typography, evidence, interaction, and visual composition. Preserve an established product theme when a project already has one, and follow an explicitly requested alternative.

The default interface is a white light-mode surface with IBM Plex Sans, Inconsolata for code and data, flat monochrome components, square corners, subtle borders, and no decorative gradients or shadows. Mathematical pages add KaTeX within the same shell.

## Files

- `theme.css` contains the interface tokens, resets, controls, tables, badges, and data-display primitives.
- `fonts.css` loads the bundled font files from `vendor/`.
- `docs/experience-principles.md` defines the general model for context, time, culture, perception, fluency, meaning, affect, conceptual framing, multiscale structure, autonomy, and external cognition.
- `docs/typography.md` defines Latin, regional Chinese, mathematics, code, fallback, delivery, and embedding rules.
- `docs/slides.md` defines deck structure, slide roles, mixed-language mathematics, evidence, rhythm, export, and validation.
- `slides.css` contains reusable slide typography and layout primitives.
- `essay.css`, `essay.js`, and `diagrams.js` provide the technical and mathematical essay profile: a table of contents, margin sidenotes, serif prose, theorem blocks, and canvas diagrams.
- `docs/essay.md` defines the exposition layout and analytical diagram grammar, rendered in `essay.html`.
- `editorial.css` contains the opt-in Bright Field and Dark Field layouts for posters, covers, landing-page heroes, and research campaigns.
- `docs/scientific-editorial.md` defines one derived art-direction profile, with field variants, generation briefs, accuracy rules, anti-patterns, and an evaluation rubric.
- `specimens/typography-slides.md` is the canonical mixed Chinese, mathematics, and code specimen deck.
- `index.html` is the rendered reference for both the interface system and editorial profiles.
- `THIRD_PARTY_NOTICES.md` lists bundled dependencies and their licenses. `vendor/manifest.json` records their source URLs, versions, and hashes.

## Use

Copy the shared CSS files, `fonts.css`, and `vendor/` into your static site,
preserving their relative paths. Include `LICENSE` and
`THIRD_PARTY_NOTICES.md` with the copied files. An essay also uses `essay.js`
and, when it contains canvas diagrams, `diagrams.js` and its own diagram code.

Import the shared styles before product-specific layout rules:

```html
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="editorial.css">
<link rel="stylesheet" href="site.css">
```

`theme.css` and `essay.css` import `fonts.css`. The included examples load
font and KaTeX assets from this repository. Keep KaTeX's CSS, JavaScript,
and font directory together when copying its files. The manifest lists the
bundled font families and weights. The typography guide also lists optional
families and system fallbacks that are not bundled.

Preview the reference pages through a static HTTP server so browser modules
can load. For example, from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/index.html` or
`http://127.0.0.1:8000/essay.html`. Static-site use requires no build step.
The [slide guide](docs/slides.md) documents the separate Marp build commands.

Product styles should consume the `--pf-*` variables. Site-specific CSS may define layout and document semantics. Reusable tokens, components, and visual patterns belong here.

Read `docs/experience-principles.md` before selecting a profile or inventing a visual treatment. Begin from purpose, audience, culture, context, content frame, required action, expertise, evidence, affect, time course, scale, and external-memory needs. Palette and surface style follow those decisions.

## Interface standard

User-facing interfaces should provide:

- semantic structure and native controls before custom interaction
- visible keyboard focus and complete hover, active, disabled, loading, success, and failure states where applicable
- responsive layouts that preserve reading order and usable controls
- direct hierarchy with one clear primary action or result per region
- functional color whose meaning is also expressed through text or structure
- real charts, equations, labels, and measurements generated from their authoritative data

Framework choice is independent of the visual system. The same tokens and interaction standards apply to static HTML, HTMX, React, and other implementations.

## Typography and slides

Read `docs/typography.md` whenever an artifact contains Chinese, mathematics, or aligned multilingual code. Read `docs/slides.md` before designing a deck. Import `slides.css` after `theme.css` for slide-specific roles and layouts.

The default slide stack uses IBM Plex Sans for Latin text, IBM Plex Sans SC or TC for Chinese, KaTeX’s coordinated fonts in the existing Marp pipeline, IBM Plex Math for compatible OpenType MATH engines, IBM Plex Mono for Latin code, and Sarasa Mono for code containing Chinese.

## Scientific editorial profiles

Scientific editorial is a worked profile derived from the general experience principles. Bright Field and Dark Field are two presentations of that profile:

- **Bright Field** places an unfamiliar specimen or structure in active warm-white space. Grazing light, relief, translucency, shadow, or one dense inclusion reveals the important event.
- **Dark Field** places an unfamiliar phenomenon in active near-black space. Localized warm-ivory emission reveals one seam, node, aperture, trajectory, or intersection.

Both profiles use one dominant phenomenon, asymmetric composition, sparse measurement graphics, credible material detail, limited color, exact typography, and intentional copy space. They are opt-in editorial canvases rather than global replacements for the interface theme.

Read `docs/scientific-editorial.md` before creating or directing a scientific poster, cover, campaign image, or editorial research page.

## Extension rule

Begin with the general experience principles, then use the existing tokens and patterns. When a required reusable pattern is missing, add it to `chao-ui` instead of creating a nearby untracked visual system inside one product.

## Browser storage and requests

The reference pages load their runtime assets locally. The essay's theme
toggle stores the selected light or dark mode in this site's browser
`localStorage` under `chao-ui-theme`. Project JavaScript includes no analytics
or telemetry. Following an external reference link visits that site.
Deployment services and applications that reuse these files may have their
own logging, storage, and network behavior.

## License

Original code and documentation are available under the [MIT License](LICENSE).
Bundled dependencies retain their own terms, listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Font licenses and KaTeX's
code license are separate. Keep their copyright and license notices when
redistributing the corresponding assets. The project license does not grant
rights to external images, datasets, or other material you add to a site.
