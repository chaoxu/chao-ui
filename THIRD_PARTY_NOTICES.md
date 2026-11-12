# Third-party notices

The assets in `vendor/` retain their upstream licenses. The project's MIT license covers chao-ui's own code and documentation. [The asset manifest](vendor/manifest.json) records the source URL, version, file size, SHA-256 digest, and license of each vendored file.

| Component | Version | License and notices |
| --- | --- | --- |
| IBM Plex Sans | `@ibm/plex-sans@1.1.0` | [OFL-1.1](vendor/ibm-plex-sans/LICENSE.txt) |
| IBM Plex Serif | `@ibm/plex-serif@2.0.0` | [OFL-1.1](vendor/ibm-plex-serif/LICENSE.txt) |
| IBM Plex Mono | `@ibm/plex-mono@2.5.0` | [OFL-1.1](vendor/ibm-plex-mono/LICENSE.txt) |
| IBM Plex Sans SC | `@ibm/plex-sans-sc@1.1.0` | [OFL-1.1](vendor/ibm-plex-sans-sc/LICENSE.txt) |
| IBM Plex Sans TC | `@ibm/plex-sans-tc@1.1.1` | [OFL-1.1](vendor/ibm-plex-sans-tc/LICENSE.txt) |
| IBM Plex Math | `@ibm/plex-math@1.1.0` | [OFL-1.1](vendor/ibm-plex-math/LICENSE.txt) |
| Inconsolata | `3.000` | [OFL-1.1](vendor/inconsolata/OFL.txt) |
| Sarasa Mono SC | `0.36.0` | [OFL-1.1](vendor/sarasa-mono-sc/LICENSE) |
| KaTeX JavaScript and CSS | `0.19.1` | [MIT](vendor/katex/LICENSE) |
| KaTeX fonts | From KaTeX `0.19.1` | [OFL-1.1](vendor/katex/OFL.txt), [font notices](vendor/katex/FONT-NOTICES.txt) |

[IBM Plex](https://github.com/IBM/plex) is copyright IBM Corp. and reserves the font name “Plex.” [Inconsolata](https://github.com/googlefonts/Inconsolata) is copyright the Inconsolata Project Authors. [Sarasa Gothic](https://github.com/be5invis/Sarasa-Gothic) credits Renzhi Li, the Inter Project Authors, Adobe Systems Incorporated, and Google. Their full notices accompany the files.

[KaTeX](https://github.com/KaTeX/KaTeX) credits Khan Academy and other contributors for its software. Its fonts separately credit Design Science and Khan Academy under the OFL. `FONT-NOTICES.txt` preserves the license descriptions and reserved font names extracted from the distributed fonts' metadata. `OFL.txt` supplies the full license text from the [SPDX license list](https://github.com/spdx/license-list-data/blob/v3.27.0/text/OFL-1.1.txt).

## Asset selection

The font binaries are unmodified upstream files. `fonts.css` selects the faces used by the interface, essay, and slide specimens. IBM's complete WOFF2 files retain their original glyph coverage. Sarasa Mono SC Regular comes from the official release archive. KaTeX's CSS, JavaScript, and coordinated font files come from its npm release.

Copy `fonts.css` and `vendor/` with the shared styles, preserving their relative paths. Include this notice and the applicable license files when redistributing the assets. Font changes, including webfont subsetting, must follow the OFL's reserved-name and redistribution conditions. Documents rendered with OFL fonts retain their own licensing terms.
