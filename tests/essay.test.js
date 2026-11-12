import { expect, test } from "bun:test";
import { runInNewContext } from "node:vm";

const source = await Bun.file(new URL("../essay.js", import.meta.url)).text();

// Only the DOM surfaces used by essay.js. Layout dimensions are explicit so
// the tests can detect changed placement without a browser or dependencies.
class Element {
  listeners = new Map();
  attributes = new Map();
  children = [];
  style = {};
  top = 0;
  offsetHeight = 40;
  hovered = false;
  classes = new Set();
  toggles = 0;
  classList = {
    add: (name) => this.classes.add(name),
    remove: (name) => this.classes.delete(name),
    contains: (name) => this.classes.has(name),
    toggle: (name, on) => {
      this.toggles++;
      if (on) this.classes.add(name);
      else this.classes.delete(name);
    },
  };
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
  }
  dispatchEvent(event) {
    for (const listener of this.listeners.get(event.type) || []) listener(event);
  }
  fire(type) { this.dispatchEvent({ type }); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  set innerHTML(value) { this.html = value; this.children = []; }
  get innerHTML() { return this.html || ""; }
  appendChild(child) { this.children.push(child); }
  prepend(child) { this.children.unshift(child); }
  querySelectorAll() { return []; }
  matches(selector) { return selector === ":hover" && this.hovered; }
  getBoundingClientRect() { return { top: this.top }; }
}

function fixture(script = source) {
  const grid = new Element(), prose = new Element(), rail = new Element(), footnotes = new Element();
  const refs = [new Element(), new Element()];
  const items = [new Element(), new Element()];
  const wide = new Element(), dark = new Element(), window = new Element();
  wide.matches = true;
  dark.matches = false;
  grid.top = 100;
  prose.offsetHeight = 500;
  refs[0].top = 200;
  refs[1].top = 220;
  refs.forEach((ref, index) => ref.setAttribute("href", `#fn${index + 1}`));
  items.forEach((item, index) => { item.innerHTML = `Footnote ${index + 1}`; });
  prose.querySelector = () => footnotes;
  prose.querySelectorAll = () => refs;
  let resolveFonts;
  const fontsReady = new Promise((resolve) => { resolveFonts = resolve; });
  const document = {
    readyState: "complete",
    documentElement: new Element(),
    activeElement: null,
    fonts: { ready: fontsReady },
    querySelector: (selector) => ({ ".pf-essay-grid": grid, ".pf-essay-prose": prose, ".pf-essay-sidenotes": rail })[selector] || null,
    querySelectorAll: () => [],
    getElementById: (id) => items[Number(id.slice(2)) - 1] || null,
    createElement: () => new Element(),
  };
  window.scrollY = 25;
  window.matchMedia = (query) => query.includes("min-width") ? wide : dark;
  runInNewContext(script, {
    document, window,
    localStorage: { getItem: () => null },
    CustomEvent: class { constructor(type) { this.type = type; } },
  });
  return {
    refs, items, grid, prose, rail, footnotes, wide, window, document,
    finishFonts: async () => { resolveFonts(); await fontsReady; },
  };
}

test("sidenote reference listeners stay bounded across repeated layouts", async () => {
  const f = fixture();
  for (let i = 0; i < 30; i++) f.window.fire("resize");
  f.window.fire("load");
  await f.finishFonts();
  for (const ref of f.refs) {
    for (const event of ["mouseenter", "mouseleave", "focus", "blur"]) {
      expect(ref.listeners.get(event)?.size).toBe(1);
    }
  }

  const ref = f.refs[0], detached = f.rail.children[0];
  f.window.fire("resize");
  const current = f.rail.children[0], oldToggles = detached.toggles;
  ref.hovered = true;
  ref.fire("mouseenter");
  expect(current.classList.contains("is-highlighted")).toBe(true);
  expect(detached.toggles).toBe(oldToggles);
  ref.hovered = false;
  ref.fire("mouseleave");
  expect(current.classList.contains("is-highlighted")).toBe(false);
  f.document.activeElement = ref;
  ref.fire("focus");
  expect(current.classList.contains("is-highlighted")).toBe(true);
  f.window.fire("resize");
  expect(f.rail.children[0].classList.contains("is-highlighted")).toBe(true);
  f.document.activeElement = null;
  ref.fire("blur");
  expect(f.rail.children[0].classList.contains("is-highlighted")).toBe(false);
  expect(detached.toggles).toBe(oldToggles);
});

test("sidenotes refresh content and placement across wide and narrow layouts", async () => {
  const f = fixture();
  expect(f.rail.children.map((note) => note.style.top)).toEqual(["98px", "152px"]);
  expect(f.rail.style.minHeight).toBe("500px");
  expect(f.footnotes.classList.contains("pf-footnotes-enhanced")).toBe(true);

  f.grid.top = 80;
  f.refs[0].top = 400;
  f.refs[1].top = 410;
  f.prose.offsetHeight = 100;
  f.items[0].innerHTML = "Updated after rendering";
  f.refs[0].hovered = true;
  f.window.fire("resize");
  expect(f.rail.children.map((note) => note.style.top)).toEqual(["318px", "372px"]);
  expect(f.rail.style.minHeight).toBe("412px");
  expect(f.rail.children[0].innerHTML).toBe("Updated after rendering");
  expect(f.rail.children[0].classList.contains("is-highlighted")).toBe(true);

  const detached = f.rail.children[0], oldToggles = detached.toggles;
  f.wide.matches = false;
  f.window.fire("resize");
  expect(f.rail.children.length).toBe(0);
  expect(f.footnotes.classList.contains("pf-footnotes-enhanced")).toBe(false);
  f.refs[0].fire("focus");
  expect(detached.toggles).toBe(oldToggles);
  f.wide.matches = true;
  f.window.fire("resize");
  expect(f.rail.children.length).toBe(2);
  expect(f.rail.children[0].style.top).toBe("318px");
  expect(f.footnotes.classList.contains("pf-footnotes-enhanced")).toBe(true);
  await f.finishFonts();
});
