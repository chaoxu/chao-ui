---
marp: true
math: katex
theme: chao-ui
paginate: true
size: 16:9
html: true
class: pf-slide pf-slide-sc
title: Chao UI mixed Chinese and mathematics typography specimen
style: |
  @import url('../theme.css');

  section.pf-slide {
    font-size: 29px;
    padding: 62px 82px;
  }

  section.pf-slide h1 {
    font-size: 2.05em;
  }

  section.pf-slide h2 {
    font-size: 1.36em;
  }

  section.pf-slide table {
    font-size: 0.66em;
  }

  section.pf-slide th,
  section.pf-slide td {
    padding: 0.45em 0.6em;
  }

  section.pf-slide pre {
    font-size: 0.61em;
    line-height: 1.45;
    padding: 0.9em 1em;
    border: 1px solid var(--pf-border);
    background: var(--pf-surface);
  }

  section.pf-slide .glyph-line {
    max-width: none;
    font-size: 1.08em;
    letter-spacing: 0.02em;
  }

  section.pf-slide .math-glyphs {
    max-width: none;
    font-family: var(--pf-slide-font-math);
    font-size: 1.28em;
    word-spacing: 0.35em;
  }

  section.pf-slide .compact {
    font-size: 0.78em;
  }

  section.math-specimen h2 + p {
    max-width: none;
  }

  section.theorem-specimen blockquote {
    margin: 0.5em 0 0;
    padding: 0.9em 1.1em;
    color: var(--pf-fg);
    border: 1px solid var(--pf-border-strong);
    border-left: 3px solid var(--pf-accent);
    background: var(--pf-surface);
  }

  section.theorem-specimen blockquote::before,
  section.theorem-specimen blockquote::after {
    display: none;
  }

  section.pf-slide .role {
    color: var(--pf-muted);
    font-family: var(--pf-slide-font-code);
    font-size: 0.54em;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  section.pf-slide::after {
    color: var(--pf-muted);
    font-family: var(--pf-slide-font-code);
    font-size: 0.45em;
  }
---

<div class="pf-slide-kicker">Chao UI / typography specimen</div>

# 中英混排与数学字体

Chinese, English, mathematics, and code in one reproducible slide system

<p class="pf-slide-meta">IBM Plex Sans SC, KaTeX, IBM Plex Math, IBM Plex Mono, Sarasa Mono SC</p>

---

<div class="pf-slide-kicker">Regional text / glyph routing</div>

## 中文与 Latin text 必须共享层级，不必共享每个字形

<div class="pf-slide-grid">
<div class="pf-slide-panel pf-zh-sc" lang="zh-CN">
<p class="role">Simplified Chinese / zh-CN</p>
<p class="glyph-line"><strong>简体中文：</strong>研究对象、定义、证明与结论。</p>
<p>同一段中可以包含 <strong>Latin identifiers</strong>、数字 2026、希腊字母 α，以及中文标点“，。；：”。</p>
</div>
<div class="pf-slide-panel pf-zh-tc" lang="zh-TW">
<p class="role">Traditional Chinese / zh-TW</p>
<p class="glyph-line"><strong>繁體中文：</strong>研究對象、定義、證明與結論。</p>
<p>語言標記決定地區字形。投影片、圖表與 SVG 應使用相同的字形政策。</p>
</div>
</div>

<p class="pf-slide-source">Stress test: regional glyphs, punctuation, Latin fallback, numerals, Greek, and line wrapping.</p>

---

<!-- _class: pf-slide pf-slide-sc math-specimen -->

<div class="pf-slide-kicker">Mathematics / KaTeX pipeline</div>

## 数学字体必须作为一个协调系统渲染

Inline math stays readable inside Chinese prose: 对所有 $x \in \mathbb{R}^n$，定义 $f(x)=\lVert Ax-b\rVert_2^2$。

$$
\mathcal{L}(\theta)
= \sum_{i=1}^{m} w_i\,\ell\!\left(y_i, f_\theta(x_i)\right)
+ \lambda \int_{0}^{1}\!\lVert \nabla f_\theta(\gamma(t))\rVert^2\,dt
$$

$$
M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \qquad
g(x)=\begin{cases}
x^2, & x \ge 0,\\
-x, & x < 0.
\end{cases}
$$

<p class="math-glyphs">∑ ∫ √ ∂ ∇ ∞ ≠ ≤ ≥ → ↦ ℝ ℂ 𝔤 𝒜 α β Γ Ω</p>

<p class="pf-slide-source">KaTeX renders equations. The final line checks the OpenType math fallback independently.</p>

---

<!-- _class: pf-slide pf-slide-sc theorem-specimen -->

<div class="pf-slide-kicker">Theorem / explanatory hierarchy</div>

## 标题先说明结论，公式再承担精确内容

> **定理（投影算子的稳定性）**
>
> 设 $C\subseteq\mathbb{R}^n$ 为非空闭凸集，则欧氏投影 $P_C$ 是非扩张映射：
>
> $$
> \lVert P_C(x)-P_C(y)\rVert_2 \le \lVert x-y\rVert_2
> \qquad \text{对所有 } x,y\in\mathbb{R}^n.
> $$

<p class="pf-slide-claim">口头说明解释机制，投影片保留假设、对象和精确结论。</p>

<p class="pf-slide-source">Specimen theorem for typography testing. It is not presented as a novel result.</p>

---

<div class="pf-slide-kicker">Code / aligned CJK monospace</div>

## 中文注释需要协调的等宽字体

<div class="pf-slide-grid">
<div>
<p class="role">IBM Plex Mono / Latin code</p>

```ts
type Result = {
  value: number;
  certified: boolean;
};

const norm = (x: number[]) =>
  Math.hypot(...x);
```
</div>
<div class="pf-code-cjk">
<p class="role">Sarasa Mono SC / Chinese code</p>

```text
// 列应保持对齐
名称      状态      数值
下界      已验证    1.414
上界      待检查    1.500

const 结果 = {
  结论: "未解决",
  证据: "可复核"
};
```

</div>
</div>

<p class="pf-slide-source">If Sarasa Mono SC is missing, this slide should expose the fallback through broken column alignment.</p>

---

<div class="pf-slide-kicker">Evidence / projection stress test</div>

## 字体选择必须经受投影、导出与归档

| Layer | Required check | Failure signal |
| --- | --- | --- |
| Chinese | SC/TC glyph forms and punctuation | Japanese or wrong regional forms |
| Mathematics | roots, accents, matrices, cases, semantic alphabets | clipped or substituted operators |
| Code | Latin and Chinese cell width | drifting columns |
| PDF | embedded or subset fonts | unexpected system substitution |
| Projection | Regular and SemiBold remain legible | thin strokes disappear |

<p class="compact">This deck loads pinned fonts from the local vendor directory. Keep their license notices with the files when distributing a deck.</p>

<p class="pf-slide-source">Authority: docs/typography.md, Deck rules: docs/slides.md, Shared CSS: slides.css</p>
