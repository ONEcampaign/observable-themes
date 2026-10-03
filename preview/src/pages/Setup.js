import React from "react";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
function Setup() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Installation",
      description: "Install the package from npm."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: "npm install @one-data/observable-themes" })
  ), /* @__PURE__ */ React.createElement(Section, { title: "Setup" }, /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Import the base stylesheet in your ", /* @__PURE__ */ React.createElement("code", null, "style.css"), " file. This loads the Colfax and Italian Plate typefaces, CSS custom properties, resets, and all component styles."), /* @__PURE__ */ React.createElement(CodeBlock, { code: `/* src/style.css */
@import "@one-data/observable-themes/styles/index.css";` }), /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Configure ", /* @__PURE__ */ React.createElement("code", null, "observablehq.config.js"), " to point to your stylesheet. You can also import the ONE logo favicon from the brand module. We recommend setting up your", " ", /* @__PURE__ */ React.createElement("code", null, "observablehq.config.js"), " as follows:"), /* @__PURE__ */ React.createElement(CodeBlock, { code: `// observablehq.config.js
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
}` })), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Importing components",
      description: "Components are grouped by module. Import only what you need."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { Header, KPICards } from "npm:@one-data/observable-themes/ui"
import { DropdownMenu, SegmentedToggle } from "npm:@one-data/observable-themes/inputs"
import { ONEVisual, AutoPlot } from "npm:@one-data/observable-themes/charts"
import { ONEColors, ONEPalette } from "npm:@one-data/observable-themes/colors"
import { formatValue, downloadXLSX } from "npm:@one-data/observable-themes/utils"` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Embedding",
      description: "Size an iframe to its content without a second scrollbar."
    },
    /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Importing anything from ", /* @__PURE__ */ React.createElement("code", null, "npm:@one-data/observable-themes/utils"), " loads the embed module. When a page runs inside an iframe or with ", /* @__PURE__ */ React.createElement("code", null, "?embed=true"), " in its URL, the module adds the ", /* @__PURE__ */ React.createElement("code", null, "embedded"), " class to ", /* @__PURE__ */ React.createElement("code", null, "<html>"), " and posts", " ", /* @__PURE__ */ React.createElement("code", null, "{ height }"), " to the parent window whenever the page height changes, rounded up to a whole pixel."),
    /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "A parent that sizes the iframe to the posted height should load the page with", " ", /* @__PURE__ */ React.createElement("code", null, "?embed=true"), ". A framed page with that flag hides its own overflow, which removes the second scrollbar. A framed page without the flag keeps scrolling, for hosts that embed it at a fixed height."),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `<iframe id="dashboard" src="https://data-apps.one.org/my-app/index.html?embed=true"></iframe>
<script>
  const iframe = document.getElementById("dashboard")
  window.addEventListener("message", (event) => {
    if (event.source === iframe.contentWindow && typeof event.data?.height === "number") {
      iframe.style.height = \`\${event.data.height}px\`
    }
  })
<\/script>` }),
    /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "Framed content must not size itself in ", /* @__PURE__ */ React.createElement("code", null, "vh"), " units. Inside an iframe", " ", /* @__PURE__ */ React.createElement("code", null, "vh"), " is the iframe height, so an element with ", /* @__PURE__ */ React.createElement("code", null, "min-height: 100vh"), " ", "grows with every posted height and the iframe grows without end.")
  ));
}
export {
  Setup as default
};
