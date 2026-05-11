import React from "react";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
const SAMPLE = "The quick brown fox jumps over the lazy dog";
const COLFAX_WEIGHTS = [
  { weight: 100, label: "Thin" },
  { weight: 300, label: "Light" },
  { weight: 400, label: "Regular" },
  { weight: 500, label: "Medium" },
  { weight: 700, label: "Bold" },
  { weight: 900, label: "Black" }
];
const ITALIAN_PLATE_WEIGHTS = [
  { weight: 100, label: "Thin" },
  { weight: 200, label: "Extralight" },
  { weight: 300, label: "Light" },
  { weight: 400, label: "Regular" },
  { weight: 500, label: "Medium" },
  { weight: 600, label: "Demibold" },
  { weight: 700, label: "Bold" },
  { weight: 800, label: "Extrabold" },
  { weight: 900, label: "Black" }
];
const TEXT_CLASSES = [
  {
    cls: "app-title",
    label: ".app-title",
    sample: "Dashboard title",
    meta: "2.25rem \xB7 Colfax 400 \xB7 page heading"
  },
  {
    cls: "section-header",
    label: ".section-header",
    sample: "Section heading",
    meta: "1.5rem \xB7 Colfax 300 \xB7 section title"
  },
  {
    cls: "plain-text",
    label: ".plain-text",
    sample: "Body copy for descriptions, notes, and supporting text.",
    meta: "1rem \xB7 Colfax 400 \xB7 body copy"
  },
  {
    cls: "nav-text",
    label: ".nav-text",
    sample: "Navigation link",
    meta: "1.25rem \xB7 Colfax 600 \xB7 desktop navigation"
  },
  {
    cls: "plot-title",
    label: ".plot-title",
    sample: "Aid flows to sub-Saharan Africa",
    meta: "1.5rem \xB7 Italian Plate 600 \xB7 chart title"
  },
  {
    cls: "plot-subtitle",
    label: ".plot-subtitle",
    sample: "Disbursements by country, 2024 (US$ millions)",
    meta: "1.125rem \xB7 Italian Plate 400 \xB7 chart subtitle"
  }
];
function Typography() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, "Typography"), /* @__PURE__ */ React.createElement("p", { className: "page-desc" }, "Two typefaces ship with the package: ", /* @__PURE__ */ React.createElement("strong", null, "Colfax"), " for UI and body copy, and ", /* @__PURE__ */ React.createElement("strong", null, "Italian Plate"), " for chart titles and display text. Both are loaded from the jsDelivr CDN when you import the base stylesheet \u2014 no local font files needed."), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Colfax",
      description: "The primary UI typeface. Used for headings, body copy, labels, navigation, and all interactive controls."
    },
    /* @__PURE__ */ React.createElement("div", { className: "type-specimens" }, COLFAX_WEIGHTS.map(({ weight, label }) => /* @__PURE__ */ React.createElement("div", { key: weight, className: "type-specimen" }, /* @__PURE__ */ React.createElement("p", { style: {
      fontFamily: "var(--font-colfax, sans-serif)",
      fontWeight: weight,
      fontSize: "1.4rem",
      margin: 0,
      lineHeight: 1.3,
      color: "var(--color-ink, #0f172a)"
    } }, SAMPLE), /* @__PURE__ */ React.createElement("span", { className: "type-meta" }, label, " \xB7 ", weight)))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `/* Reference Colfax via the CSS custom property */
font-family: var(--font-colfax);

/* Or by name \u2014 loaded via @font-face in styles/fonts.css */
font-family: 'Colfax', sans-serif;` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Italian Plate",
      description: "Used for chart titles, subtitles, and display text. Brings editorial character to data visualizations. Available in nine weights."
    },
    /* @__PURE__ */ React.createElement("div", { className: "type-specimens" }, ITALIAN_PLATE_WEIGHTS.map(({ weight, label }) => /* @__PURE__ */ React.createElement("div", { key: weight, className: "type-specimen" }, /* @__PURE__ */ React.createElement("p", { style: {
      fontFamily: "var(--font-italian-plate, serif)",
      fontWeight: weight,
      fontSize: "1.4rem",
      margin: 0,
      lineHeight: 1.3,
      color: "var(--color-ink, #0f172a)"
    } }, SAMPLE), /* @__PURE__ */ React.createElement("span", { className: "type-meta" }, label, " \xB7 ", weight)))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `/* Reference Italian Plate via the CSS custom property */
font-family: var(--font-italian-plate);

/* Or by name */
font-family: 'Italian Plate No2', serif;` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Text classes",
      description: "Utility classes defined in styles/theme.css. Apply these to HTML elements to match the package's visual hierarchy."
    },
    /* @__PURE__ */ React.createElement("div", { className: "type-specimens", style: { marginBottom: "0.75rem" } }, TEXT_CLASSES.map(({ cls, label, sample, meta }) => /* @__PURE__ */ React.createElement("div", { key: cls, className: "type-specimen text-class-row" }, /* @__PURE__ */ React.createElement("p", { className: cls, style: { margin: 0 } }, sample), /* @__PURE__ */ React.createElement("span", { className: "type-meta" }, /* @__PURE__ */ React.createElement("code", { style: { fontFamily: "inherit", color: "#1A9BA3" } }, label), " \xB7 ", meta)))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `<!-- Apply text classes to HTML elements -->
<h1 class="app-title">Dashboard title</h1>
<h2 class="section-header">Section heading</h2>
<p  class="plain-text">Body copy</p>

<!-- Observable Framework markdown \u2014 inline HTML or JSX -->
<div class="plot-title">Chart title</div>
<div class="plot-subtitle">Chart subtitle</div>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "CSS custom properties",
      description: "Font and color tokens defined in styles/theme.css."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `/* Font stacks */
--font-colfax:        'Colfax', sans-serif;
--font-italian-plate: 'Italian Plate No2', serif;

/* Base colors */
--color-ink:     #0f172a;   /* default text */
--color-surface: #ffffff;   /* default background */` })
  ));
}
export {
  Typography as default
};
