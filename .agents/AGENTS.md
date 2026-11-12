# Chao UI authority

`chao-ui` defines the visual system maintained in this repository. Apply its tokens, components, and design guidance to work that adopts the system. Preserve an established product theme and follow an explicitly requested alternative.

Read the relevant authority before designing:

- Start with `README.md`, `docs/experience-principles.md`, and `theme.css` for every user-facing artifact.
- Read `docs/typography.md` for Chinese, mathematics, code, font delivery, and PDF embedding.
- Read `docs/slides.md` and `slides.css` for presentations, then verify against `specimens/typography-slides.md` when fonts or renderers change.
- Read `docs/essay.md`, `essay.css`, and `diagrams.js` for technical essays, blog posts, mathematical surveys, and bespoke `<canvas>`/SVG analytical diagrams, using `essay.html` as the rendered specimen.
- Read `editorial.css` and `docs/scientific-editorial.md` for posters, covers, key visuals, research campaigns, and editorial landing pages.
- Use `index.html` as the rendered component and profile reference.

Derive aesthetic decisions from purpose, audience, culture, context, expertise, content frame, action, evidence, affect, time course, scale, and external-memory needs. Treat palettes and named profiles as reusable parameter bundles, not as the source of the design.

The default interface uses a solid white background, light-slate panels, deep ink text, IBM Plex Sans, Inconsolata for code and data, subtle borders, square corners, and functional color. Container gradients, decorative shadows, glassmorphism, and ornamental color are outside the system.

Scientific editorial is a derived profile rather than the general `chao-ui` model. Bright Field and Dark Field are its opt-in canvases. Keep controls, navigation, copy, equations, plots, and measurements native and exact. Generated imagery may supply physical texture, atmosphere, and a dominant phenomenon. It must not fabricate scientific evidence, labels, or prose.

Implement semantic structure, keyboard access, visible focus, responsive reading order, and complete interaction states. Keep one clear primary action or result per region. Express status with text or structure as well as color.

Consume the shared `--pf-*` variables and components. Add a reusable missing pattern to this repository instead of forking a private substitute inside a product.

Preserve the local asset paths, `LICENSE`, and third-party notices when
updating examples or delivery instructions. Keep fonts and runtime assets
in the documented bundle. Review required credits before reusing external
material, and distinguish illustrative graphics from measured evidence.
