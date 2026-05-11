import React from "react";
import { KPICards } from "@pkg/ui/index.js";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
const KPI_DATA = [
  { title: "Countries supported", kpi: "54", description: "across sub-Saharan Africa" },
  { title: "Total funding secured", kpi: "US$4.2B", description: "committed in 2024" },
  { title: "People reached", kpi: "12.8M", description: "through campaigns" },
  { title: "Partner organisations", kpi: "380+", description: "in the network" }
];
function UI() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, "UI"), /* @__PURE__ */ React.createElement("p", { className: "page-desc" }, "Structural components for Observable Framework pages. These handle layout and navigation so individual pages can focus on content."), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "Header",
      description: "The page header used in this preview. It renders the app title, a short description, and a responsive navigation menu \u2014 collapsing to a hamburger on mobile. Set header: false in observablehq.config.js to disable the built-in Observable header and use this one instead."
    },
    /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "The ", /* @__PURE__ */ React.createElement("code", null, "Header"), " at the top of this page is the same component. It receives a list of nav items and a ", /* @__PURE__ */ React.createElement("code", null, "currentPage"), " id to highlight the active link."),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { Header } from "npm:@one-data/observable-themes/ui"

// Define nav items once, typically in a shared config or layout file
const navItems = [
  { id: "overview", label: "OVERVIEW", href: "/overview" },
  { id: "data",     label: "DATA",     href: "/data"     },
  { id: "about",    label: "ABOUT",    href: "/about"    },
]

// Render in your page \u2014 pass the current page id to highlight the active link
<Header
  appTitle="Human Development Dashboard"
  appDescription="Tracking aid, debt, and development finance across Africa."
  navItems={navItems}
  currentPage="overview"
/>` }),
    /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, "In Observable Framework, pages are separate ", /* @__PURE__ */ React.createElement("code", null, ".md"), " files. Pass the current page id as a hard-coded string in each file, or derive it from", " ", /* @__PURE__ */ React.createElement("code", null, "location.pathname"), ":"),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `// Derive the active page from the URL path
const currentPage = location.pathname.replace(/^\\//, "").replace(/\\.html$/, "") || "overview"

<Header
  appTitle="Human Development Dashboard"
  navItems={navItems}
  currentPage={currentPage}
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "KPI Cards",
      description: "A horizontal row of metric cards, each showing a title, primary KPI value, and a short description. Cards share equal width and expand to fill the container."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(KPICards, { data: KPI_DATA })),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { KPICards } from "npm:@one-data/observable-themes/ui"

const data = [
  { title: "Countries supported", kpi: "54",      description: "across sub-Saharan Africa" },
  { title: "Total funding",       kpi: "US$4.2B", description: "committed in 2024"         },
  { title: "People reached",      kpi: "12.8M",   description: "through campaigns"     },
  { title: "Partner orgs",        kpi: "380+",    description: "in the network"        },
]

<KPICards data={data} />` })
  ));
}
export {
  UI as default
};
