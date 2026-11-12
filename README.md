# chao-ui

`chao-ui` is a visual design system for websites, applications, dashboards, technical essays, slides, posters, covers, and research graphics. It combines reusable CSS and browser components with guidance on typography, evidence, interaction, and visual composition. Preserve an established product theme when a project already has one, and follow an explicitly requested alternative.

The default interface uses a white light-mode surface, light-slate panels, deep ink text, IBM Plex Sans, Inconsolata for code and data, flat components, square corners, and subtle borders. Color communicates meaning. Decorative gradients, shadows, glassmorphism, and ornamental color are outside this interface profile. Mathematical pages add KaTeX within the same shell.

## Choose a task

For a new artifact or a substantial change in visual direction, start with the [design brief](docs/experience-principles.md#brief-for-any-new-artifact) and [review gates](docs/experience-principles.md#review-gates), then follow the relevant row. For a routine edit, read the guide sections and implementation affected by the change, using the existing artifact as context.

| Task | Profile or shared guidance | Read | Implementation and reference |
| --- | --- | --- | --- |
| Website, application, or dashboard | Default interface | [Interface standard](#interface-standard) | [theme.css](theme.css), [index.html](index.html) |
| Technical essay, research post, or mathematical survey | Essay | [Essay guide](docs/essay.md) | [essay.css](essay.css), [essay.js](essay.js), [essay.html](essay.html) |
| Presentation | Slides | [Slide guide](docs/slides.md) | [slides.css](slides.css), [marp.config.json](marp.config.json), [typography specimen](specimens/typography-slides.md) |
| Poster, cover, campaign image, or editorial hero | Scientific editorial, with Bright Field or Dark Field | [Scientific editorial guide](docs/scientific-editorial.md) | [editorial.css](editorial.css), [index.html](index.html) |
| Analytical diagram within an artifact | The containing profile and diagram rules | [Analytical diagram rules](docs/essay.md#analytical-diagram-rules-diagramsjs) | [diagrams.js](diagrams.js), [essay.html](essay.html) |
| Chinese, mathematics, code alignment, or font delivery | Typography across profiles | [Typography guide](docs/typography.md) | [fonts.css](fonts.css), [asset manifest](vendor/manifest.json), [typography specimen](specimens/typography-slides.md) |

Profiles select typography, layout, and composition for their contexts. Scientific editorial is opt-in for a canvas or region. Its controls and navigation retain the interface standard. The [experience principles](docs/experience-principles.md) explain the design model and provide research context for decisions that need it.

## Use

Copy `theme.css`, the selected profile's files, `fonts.css`, and `vendor/` into your static site,
preserving their relative paths. Include `LICENSE` and
`THIRD_PARTY_NOTICES.md` with the copied files. An essay also uses `essay.js`
and, when it contains canvas diagrams, `diagrams.js` and its own diagram code.

Import the shared styles before product-specific layout rules:

```html
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="site.css">
```

Insert `essay.css` or `editorial.css` between these stylesheets when using that profile. Slides use the theme registration and build commands in the slide guide.

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

## Interface standard

User-facing interfaces should provide:

- semantic structure and native controls before custom interaction
- visible keyboard focus and complete hover, active, disabled, loading, success, and failure states where applicable
- responsive layouts that preserve reading order and usable controls
- direct hierarchy with one clear primary action or result per region
- functional color whose meaning is also expressed through text or structure
- real charts, equations, labels, and measurements generated from their authoritative data

Framework choice is independent of the visual system. The same tokens and interaction standards apply to static HTML, HTMX, React, and other implementations.

## Authority and extension

This README owns task routing, the interface standard, and bundle integration. The profile guides own their artifact-specific design and validation rules. The typography guide owns font roles, language routing, and embedding. CSS and JavaScript define the implemented tokens and behavior. Keep the relevant guide and specimen consistent when changing that implementation. [Third-party notices](THIRD_PARTY_NOTICES.md) and the [asset manifest](vendor/manifest.json) record dependency terms and provenance.

Product styles consume the shared `--pf-*` variables. Content, data, and site-specific layout belong in the consuming project. Add reusable tokens, components, and visual patterns to the relevant shared implementation and document them in its guide. A new profile needs a recurring context, scoped styles, and a specimen that demonstrates its behavior and review criteria.

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
