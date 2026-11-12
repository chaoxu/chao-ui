/* ==========================================================================
   Reference Specimen Diagrams for chao-ui/essay.html
   Demonstrates scripted task queues, interactive polygon geometry, and
   grouped illustrative values using diagrams.js.
   ========================================================================== */

import {
  FONTS,
  arrow,
  clamp,
  ease,
  feasiblePolygon,
  label,
  legend,
  lerp,
  lineInBox,
  mixRgb,
  mountDiagram,
  panel,
  rgba,
  seg,
  wrapMono,
} from "./diagrams.js";

// 1. Fictional task queues. Counts and playback times are display fixtures.
const QUEUE_A_TRACE = [
  ["fixture A: 60 fictional items queued", "meta", 0.2, 2.2, 0, 0],
  ["  stage 1: show 12 items", "ok", 2.2, 4.0, 0, 12],
  ["  stage 2: show 36 items", "ok", 4.0, 6.2, 12, 36],
  [
    "  stage 3: reveal the remaining items\n  stage 4: show all 60 items\n  scripted sequence complete",
    "win",
    6.2,
    12.5,
    36,
    60,
  ],
];

const QUEUE_B_TRACE = [
  ["fixture B: 60 fictional items queued", "meta", 0.2, 2.2, 0, 0],
  ["  stage 1: show 15 items", "ok", 2.2, 3.8, 0, 15],
  ["  stage 2: show 30 items", "ok", 3.8, 5.4, 15, 30],
  ["  stage 3: reveal the remaining items\n  stage 4: show all 60 items\n  scripted sequence complete", "win", 5.4, 7.6, 30, 60],
];

const heroEl = document.querySelector('[data-demo="scripted-queues"]');
if (heroEl) {
  const CYCLE = 15;
  const LH = 15;
  const stackAt = 680;
  let cache = { pw: 0 };

  mountDiagram(heroEl, {
    cycle: CYCLE,
    reduceAt: 13.8,
    height: (W) => {
      const rows = W < stackAt ? 7 : 9;
      const ph = 30 + rows * LH + 44;
      return W < stackAt ? ph * 2 + 16 : ph;
    },
    draw: (ctx, W, H, { t, P }) => {
      const narrow = W < stackAt;
      const rows = narrow ? 7 : 9;
      const gap = 16;
      const pw = narrow ? W : Math.floor((W - gap) / 2);
      const ph = 30 + rows * LH + 44;

      ctx.font = FONTS.monoSmall;
      const maxChars = Math.max(24, Math.floor((pw - 22) / ctx.measureText("M").width));
      if (cache.pw !== pw) {
        const prep = (segs) =>
          segs.map((s) => {
            const lines = wrapMono(s[0], maxChars);
            return { lines, chars: lines.reduce((a, l) => a + l.length + 1, 0) };
          });
        cache = { pw, left: prep(QUEUE_A_TRACE), right: prep(QUEUE_B_TRACE) };
      }

      drawPanel(0, 0, "Fictional queue A", QUEUE_A_TRACE, cache.left, true);
      drawPanel(narrow ? 0 : pw + gap, narrow ? ph + gap : 0, "Fictional queue B", QUEUE_B_TRACE, cache.right, false);

      function drawPanel(x, y, title, segs, wrapped, isFirst) {
        let count = 0;
        let done = true;
        const visible = [];
        segs.forEach((s, idx) => {
          const f = seg(t, s[2], s[3]);
          if (f <= 0) {
            done = false;
            return;
          }
          if (f < 1) done = false;
          count = lerp(s[4], s[5], f);
          let budget = Math.round(f * wrapped[idx].chars);
          for (const ln of wrapped[idx].lines) {
            if (budget <= 0) break;
            visible.push({ text: ln.slice(0, budget), kind: s[1] });
            budget -= ln.length + 1;
          }
        });

        const meta = `${Math.round(count)} / 60 items`;
        panel(ctx, x, y, pw, ph, title, meta, P);

        const bodyY = y + 32;
        const slice = visible.slice(Math.max(0, visible.length - rows));
        slice.forEach((ln, i) => {
          const ly = bodyY + i * LH + LH / 2;
          let color = P.fg;
          let font = FONTS.monoSmall;
          if (ln.kind === "meta") color = P.muted;
          else if (ln.kind === "bad") color = P.terracotta;
          else if (ln.kind === "win") {
            color = P.slate;
            font = FONTS.monoBold;
          }
          label(ctx, ln.text, x + 10, ly, { color, font });
        });

        // Square 0px progress bar
        const barY = y + 30 + rows * LH + 8;
        const barW = pw - 20;
        ctx.fillStyle = P.grid;
        ctx.fillRect(x + 10, barY, barW, 5);
        const frac = clamp(count / 60, 0, 1);
        ctx.fillStyle = isFirst
          ? rgba(mixRgb(P.ochreRgb, P.terraRgb, seg(frac, 0.08, 0.6)), 1)
          : P.slate;
        ctx.fillRect(x + 10, barY, Math.max(2, barW * frac), 5);

        const statusY = barY + 19;
        if (done) {
          label(
            ctx,
            "Script complete: 60 fictional items",
            x + 10,
            statusY,
            { color: P.slate, font: FONTS.sansBold }
          );
        } else {
          label(ctx, "Illustrative playback, scripted timing", x + 10, statusY, {
            color: P.muted,
            font: FONTS.sansSmall,
          });
        }
      }
    },
  });
}

// 2. A weighted norm on an explicitly defined polygon.
const polyEl = document.querySelector('[data-demo="l1-polytope"]');
if (polyEl) {
  const BOX = [-2.5, 1.5, -1.65, 1.65];
  const CONSTRAINTS = [
    { a: [1, 0.32], b: -0.95, kind: "cut", text: "boundary A", lt: 0.9, dx: 8, align: "left" },
    { a: [0.78, -0.52], b: -0.95, kind: "cut", text: "boundary B", lt: 0.88, dx: -8, align: "right" },
    { a: [0.18, 1], b: 0.62, kind: "cap", text: "band |0.18x₁ + x₂| ≤ 0.62", lt: 0.04, dx: 4, dy: -10, align: "left" },
    { a: [-0.18, -1], b: 0.62, kind: "cap" },
  ];
  const poly = feasiblePolygon(BOX, CONSTRAINTS);

  // Candidate minima: polygon vertices and axis crossings where |x_i| has a kink.
  const candidates = poly.slice();
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    for (const ax of [0, 1]) {
      if ((p[ax] <= 0 && q[ax] >= 0) || (p[ax] >= 0 && q[ax] <= 0)) {
        const s = p[ax] === q[ax] ? 0 : p[ax] / (p[ax] - q[ax]);
        candidates.push([lerp(p[0], q[0], s), lerp(p[1], q[1], s)]);
      }
    }
  }

  mountDiagram(polyEl, {
    cycle: 11,
    reduceAt: 9.8,
    height: (W) => Math.min(340, Math.max(260, W * 0.54)),
    draw: (ctx, W, H, { t, pointer, P }) => {
      const S = Math.min((W - 36) / (BOX[1] - BOX[0]), (H - 48) / (BOX[3] - BOX[2]));
      const cx = W / 2 - ((BOX[0] + BOX[1]) / 2) * S;
      const cy = (H - 18) / 2;
      const X = (p) => [cx + p[0] * S, cy - p[1] * S];
      const narrow = W < 520;

      // Weight ratio w2 / w1: interactive on pointer hover!
      const w1 = 1.0;
      const w2 = pointer.active ? lerp(0.35, 2.2, pointer.normX) : 1.0;
      const obj = (p) => w1 * Math.abs(p[0]) + w2 * Math.abs(p[1]);
      let best = candidates[0];
      for (const c of candidates) if (obj(c) < obj(best)) best = c;
      const rStar = obj(best);

      // Unboxed hairline axes
      ctx.strokeStyle = P.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(...X([BOX[0], 0]));
      ctx.lineTo(...X([BOX[1], 0]));
      ctx.moveTo(...X([0, BOX[2]]));
      ctx.lineTo(...X([0, BOX[3]]));
      ctx.stroke();

      label(ctx, narrow ? "x₁" : "x₁ (coordinate 1)", X([BOX[1], 0])[0] - 2, X([0, 0])[1] + 13, {
        color: P.muted,
        font: FONTS.sansSmall,
        align: "right",
      });
      label(ctx, narrow ? "x₂" : "x₂ (coordinate 2)", X([0, BOX[3]])[0] + 6, X([0, BOX[3]])[1] + 8, {
        color: P.muted,
        font: FONTS.sansSmall,
      });

      // Feasible polyhedron fill
      const fr = pointer.active ? 1 : ease(seg(t, 3.2, 4.2));
      if (fr > 0 && poly.length >= 3) {
        ctx.fillStyle = P.slateAlpha(0.16 * fr);
        ctx.beginPath();
        poly.forEach((p, i) => (i ? ctx.lineTo(...X(p)) : ctx.moveTo(...X(p))));
        ctx.closePath();
        ctx.fill();
        if (fr > 0.6) {
          const centroid = poly.reduce((a, p) => [a[0] + p[0] / poly.length, a[1] + p[1] / poly.length], [0, 0]);
          label(ctx, "feasible P", X([centroid[0] - 0.35, centroid[1]])[0], X(centroid)[1], {
            color: P.slate,
            font: FONTS.sansSmall,
            align: "center",
          });
        }
      }

      // Half-space boundary lines
      CONSTRAINTS.forEach((c, i) => {
        const a = pointer.active ? 1 : ease(seg(t, 0.3 + Math.min(i, 2) * 0.95, 1.0 + Math.min(i, 2) * 0.95));
        if (a <= 0) return;
        const segPts = lineInBox(c.a, c.b, BOX);
        if (!segPts) return;
        ctx.globalAlpha = a;
        ctx.strokeStyle = c.kind === "cut" ? P.terracotta : P.slate;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(...X(segPts[0]));
        ctx.lineTo(...X(segPts[1]));
        ctx.stroke();
        if (c.text) {
          const [lx, ly] = X([
            lerp(segPts[0][0], segPts[1][0], c.lt),
            lerp(segPts[0][1], segPts[1][1], c.lt),
          ]);
          label(ctx, narrow ? c.text.split(" ")[0] : c.text, lx + (c.dx || 0), ly + (c.dy || 0), {
            color: ctx.strokeStyle,
            font: FONTS.sansSmall,
            align: c.align || "left",
          });
        }
        ctx.globalAlpha = 1;
      });

      // Weighted L1 ball growing to contact
      const grow = pointer.active ? 1 : ease(seg(t, 4.5, 7.2));
      if (grow > 0) {
        const r = rStar * grow;
        const rx = r / w1;
        const ry = r / w2;
        ctx.strokeStyle = P.fg;
        ctx.lineWidth = 1.5;
        ctx.fillStyle = P.fgAlpha(0.05);
        ctx.beginPath();
        [
          [rx, 0],
          [0, ry],
          [-rx, 0],
          [0, -ry],
        ].forEach((p, i) => (i ? ctx.lineTo(...X(p)) : ctx.moveTo(...X(p))));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        const eq = `${w1.toFixed(1)}|x₁| + ${w2.toFixed(2)}|x₂| = ${r.toFixed(2)}`;
        label(ctx, eq, W - 6, 12, { color: P.fg, font: FONTS.monoSmall, align: "right" });
      }

      if (pointer.active || t > 7.3) {
        const [bx, by] = X(best);
        ctx.fillStyle = P.fg;
        ctx.fillRect(Math.round(bx - 4.5), Math.round(by - 4.5), 9, 9);
        const sparse = Math.abs(best[1]) < 1e-4;
        const summary = sparse
          ? `minimum on axis: x* = (${best[0].toFixed(2)}, 0)`
          : `w₂=${w2.toFixed(2)}: minimum at (${best[0].toFixed(2)}, ${best[1].toFixed(2)})`;
        label(ctx, summary, W / 2, H - 9, {
          color: sparse ? P.fg : P.ochre,
          font: FONTS.sansBold,
          align: "center",
        });
      } else {
        label(ctx, "min w₁|x₁| + w₂|x₂|  over  x ∈ P   (hover horizontally to vary w₂)", W / 2, H - 9, {
          color: P.muted,
          font: FONTS.sansSmall,
          align: "center",
        });
      }
    },
  });
}

// 3. Unitless values created for this chart fixture, also listed in essay.html.
const benchEl = document.querySelector('[data-demo="matrix-bars"]');
if (benchEl) {
  const SERIES = [
    { name: "Series A", color: (P) => P.stone },
    { name: "Series B", color: (P) => P.fg },
    { name: "Series C", color: (P) => P.slate },
    { name: "Series D", color: (P) => P.ochre },
  ];
  const GROUPS = [
    { name: "Case A", vals: [20, 40, 60, 80] },
    { name: "Case B", vals: [35, 55, 75, 45] },
    { name: "Case C", vals: [65, 25, 45, 85] },
    { name: "Case D", vals: [50, 70, 30, 60] },
  ];

  mountDiagram(benchEl, {
    cycle: 8,
    reduceAt: 4.0,
    height: (W) => (W < 560 ? 310 : 275),
    draw: (ctx, W, H, { t, P }) => {
      const g = ease(seg(t, 0.15, 1.5));
      const narrow = W < 580;
      const perRow = narrow ? 2 : 4;
      [SERIES.slice(0, perRow), SERIES.slice(perRow)].forEach((row, r) => {
        if (row.length) {
          legend(
            ctx,
            row.map((s) => ({ label: s.name, color: s.color(P) })),
            W / 2,
            10 + r * 18,
            P
          );
        }
      });

      const top = narrow ? 50 : 34;
      const bot = H - 28;
      const sy = (v) => lerp(bot, top + 12, v / 100);

      ctx.strokeStyle = P.grid;
      ctx.lineWidth = 1;
      for (const v of [0, 25, 50, 75, 100]) {
        ctx.beginPath();
        ctx.moveTo(32, Math.round(sy(v)) + 0.5);
        ctx.lineTo(W - 4, Math.round(sy(v)) + 0.5);
        ctx.stroke();
        label(ctx, String(v), 26, sy(v), { color: P.muted, font: FONTS.monoSmall, align: "right" });
      }

      const gw = (W - 40) / GROUPS.length;
      const bw = Math.min(24, (gw - 18) / SERIES.length);
      GROUPS.forEach((G, i) => {
        const gx = 36 + i * gw + (gw - bw * SERIES.length) / 2;
        G.vals.forEach((v, j) => {
          const x = gx + j * bw;
          const y = sy(v * g);
          ctx.fillStyle = SERIES[j].color(P);
          ctx.fillRect(Math.round(x + 1), Math.round(y), Math.max(2, Math.round(bw - 2)), Math.round(bot - y));
          if (g > 0.96 && bw >= 16) {
            label(ctx, String(v), x + bw / 2, y - 8, {
              color: P.muted,
              font: FONTS.monoSmall,
              align: "center",
            });
          }
        });
        label(ctx, G.name, 36 + i * gw + gw / 2, bot + 14, {
          color: P.fg,
          font: narrow ? FONTS.sansSmall : FONTS.sans,
          align: "center",
        });
      });
      label(ctx, "illustrative value (unitless)", 32, top - 2, { color: P.muted, font: FONTS.sansSmall });
    },
  });
}
