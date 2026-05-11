import React from "react";
import { KPICards } from "@pkg/ui/index.js";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
const KPI_DATA = [
  { title: "Countries supported", kpi: "54", description: "across sub-Saharan Africa" },
  { title: "Total funding secured", kpi: "US$4.2B", description: "committed in 2024" },
  { title: "People reached", kpi: "12.8M", description: "through ONE campaigns" },
  { title: "Partner organisations", kpi: "380+", description: "in the ONE network" }
];
function Home() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "preview-hero" }, /* @__PURE__ */ React.createElement("p", { className: "hero-badge" }, "v0.9.0"), /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, "Observable Themes"), /* @__PURE__ */ React.createElement("p", { className: "page-desc" }, "Modular CSS, React components, and utilities for building data-driven reports with Observable Framework. Includes input controls, chart containers, a color system, and typography \u2014 maintained by ONE Data.")), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Installation",
      description: "Install the package from npm."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: "npm install @one-data/observable-themes" })
  ), /* @__PURE__ */ React.createElement(Section, { title: "Setup" }, /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Import the base stylesheet in your ", /* @__PURE__ */ React.createElement("code", null, "style.css"), " file. This loads the Colfax and Italian Plate typefaces, CSS custom properties, resets, and all component styles."), /* @__PURE__ */ React.createElement(CodeBlock, { code: `/* src/style.css */
@import "@one-data/observable-themes/styles/index.css";` }), /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Configure ", /* @__PURE__ */ React.createElement("code", null, "observablehq.config.js"), " to point to your stylesheet. You can also import the ONE logo favicon from the brand module. We recommend setting up you ", /* @__PURE__ */ React.createElement("code", null, "observablehq.config.js"), " as follows:"), /* @__PURE__ */ React.createElement(CodeBlock, { code: `// observablehq.config.js
import { icon } from "@one-data/observable-themes/brand"

export default {
  title: "My app",
  head: \`<link rel="icon" href=\${icon} type="image/png" sizes="32x32">\`,

  base: "/my-app",
  preserveExtension: true,

  root: "src",
  style: "style.css",

  toc: false,
  pager: false,
  sidebar: false,
  header: false,
  footer: false,
  
  // other attributes
}` })), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Importing components",
      description: "Components are grouped by module. Import only what you need."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { KPICards } from "npm:@one-data/observable-themes/ui"
import { DropdownMenu, SegmentedToggle } from "npm:@one-data/observable-themes/inputs"
import { ONEVisual, AutoPlot } from "npm:@one-data/observable-themes/charts"
import { ONEColors, ONEPalette } from "npm:@one-data/observable-themes/colors"
import { formatValue, downloadXLSX } from "npm:@one-data/observable-themes/utils"` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "KPI Cards",
      description: "Display a row of key performance indicators. Each card shows a title, primary metric, and supporting description. Cards share equal width and fill the container."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(KPICards, { data: KPI_DATA })),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { KPICards } from "@one-data/observable-themes/ui"

const data = [
  { title: "Countries supported", kpi: "54",      description: "across sub-Saharan Africa" },
  { title: "Total funding",       kpi: "US$4.2B", description: "committed in 2024"         },
  { title: "People reached",      kpi: "12.8M",   description: "through ONE campaigns"     },
]

<KPICards data={data} />` })
  ));
}
export {
  Home as default
};
