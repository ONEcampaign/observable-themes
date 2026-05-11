import React, { useState } from "react";
import * as Plot from "@observablehq/plot";
import { AutoPlot, ONEVisual } from "@pkg/charts/index.js";
import { SegmentedToggle } from "@pkg/inputs/index.js";
import { ONEColors, ONEPalette } from "@pkg/colors/index.js";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
const FUNDING_DATA = [
  { country: "Nigeria", amount: 890, region: "West Africa" },
  { country: "Ethiopia", amount: 720, region: "East Africa" },
  { country: "Kenya", amount: 650, region: "East Africa" },
  { country: "South Africa", amount: 580, region: "Southern Africa" },
  { country: "Ghana", amount: 430, region: "West Africa" },
  { country: "Tanzania", amount: 380, region: "East Africa" },
  { country: "Uganda", amount: 290, region: "East Africa" },
  { country: "Senegal", amount: 240, region: "West Africa" }
];
const TREND_DATA = [
  { year: 2015, amount: 210 },
  { year: 2016, amount: 280 },
  { year: 2017, amount: 340 },
  { year: 2018, amount: 390 },
  { year: 2019, amount: 310 },
  { year: 2020, amount: 260 },
  { year: 2021, amount: 420 },
  { year: 2022, amount: 510 },
  { year: 2023, amount: 580 },
  { year: 2024, amount: 650 }
];
const REGION_COLORS = {
  "East Africa": ONEColors.teal1,
  "West Africa": ONEColors.orange1,
  "Southern Africa": ONEColors.navy2
};
function barPlot(width) {
  return Plot.plot({
    width,
    marginLeft: 110,
    x: { label: "Disbursements (US$ M)", grid: true },
    y: { label: null },
    color: { domain: Object.keys(REGION_COLORS), range: Object.values(REGION_COLORS) },
    marks: [
      Plot.barX(FUNDING_DATA, {
        x: "amount",
        y: "country",
        fill: (d) => REGION_COLORS[d.region],
        sort: { y: "-x" },
        tip: true
      }),
      Plot.ruleX([0])
    ]
  });
}
function linePlot(width) {
  return Plot.plot({
    width,
    y: { label: "Disbursements (US$ M)", grid: true },
    x: { label: null, tickFormat: (d) => String(d) },
    marks: [
      Plot.line(TREND_DATA, {
        x: "year",
        y: "amount",
        stroke: ONEColors.teal1,
        strokeWidth: 2.5
      }),
      Plot.dot(TREND_DATA, {
        x: "year",
        y: "amount",
        fill: ONEColors.teal1,
        r: 4,
        tip: true
      }),
      Plot.ruleY([0])
    ]
  });
}
const VIZ_OPTIONS = [
  { label: "Bar chart", value: "bar" },
  { label: "Line chart", value: "line" }
];
const STATE_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Loading", value: "loading" },
  { label: "Empty", value: "empty" },
  { label: "Error", value: "error" }
];
function Charts() {
  const [vizType, setVizType] = useState("bar");
  const [demoState, setDemoState] = useState("default");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, "Charts"), /* @__PURE__ */ React.createElement("p", { className: "page-desc" }, "Visualization containers that pair chart content with ONE Data branding, metadata, responsive sizing, and export functionality. Works with any Observable Plot mark."), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "ONEVisual",
      description: "The primary visualization wrapper. Adds a title, subtitle, source attribution, download buttons, and loading / error / empty overlays. Toggle the state selector below to preview each overlay."
    },
    /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "1rem" } }, /* @__PURE__ */ React.createElement(
      SegmentedToggle,
      {
        label: "Demo state",
        options: STATE_OPTIONS,
        value: demoState,
        onChange: setDemoState
      }
    )),
    /* @__PURE__ */ React.createElement(
      ONEVisual,
      {
        title: "Aid flows to sub-Saharan Africa",
        subtitle: "Disbursements by country, 2024 (US$ millions)",
        source: { href: "https://data.one.org", label: "ONE Data", publisher: "The ONE Campaign" },
        note: "Figures are illustrative and shown for demonstration purposes only.",
        loading: demoState === "loading",
        error: demoState === "error" ? new Error("Failed to load") : null,
        empty: demoState === "empty",
        emptyMessage: "No data available for the selected filters.",
        imageDownload: true,
        dataDownload: true,
        data: FUNDING_DATA,
        fileName: "aid-flows-2024"
      },
      /* @__PURE__ */ React.createElement(AutoPlot, { data: FUNDING_DATA, plotFn: barPlot })
    ),
    /* @__PURE__ */ React.createElement("br", null),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `
import * as Plot from "@observablehq/plot"
import { ONEVisual, AutoPlot } from "npm:@one-data/observable-themes/charts"
import { ONEColors } from "npm:@one-data/observable-themes/colors"

const plotFn = (width) => Plot.plot({
  width,
  marginLeft: 110,
  marks: [
    Plot.barX(data, { x: "amount", y: "country", fill: ONEColors.teal1, sort: { y: "-x" } }),
    Plot.ruleX([0]),
  ],
})

<ONEVisual
  title="Aid flows to sub-Saharan Africa"
  subtitle="Disbursements by country, 2024 (US$ millions)"
  source={{ href: "https://data.one.org", label: "ONE Data", publisher: "The ONE Campaign" }}
  note="Figures are illustrative."
  loading={isLoading}
  empty={data.length === 0}
  error={fetchError}
  imageDownload
  dataDownload
  data={data}
  fileName="aid-flows"
>
  <AutoPlot data={data} plotFn={plotFn} />
</ONEVisual>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "AutoPlot",
      description: "Responsive container that re-renders an Observable Plot chart whenever the container width changes. Pass a plotFn that accepts width and returns a Plot element."
    },
    /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "1rem" } }, /* @__PURE__ */ React.createElement(
      SegmentedToggle,
      {
        label: "Chart type",
        options: VIZ_OPTIONS,
        value: vizType,
        onChange: setVizType,
        disabled: true,
        disabledReason: "porque me salio de ahi"
      }
    )),
    /* @__PURE__ */ React.createElement("div", { className: "demo-block", style: { padding: "1rem 0.5rem" } }, /* @__PURE__ */ React.createElement(
      AutoPlot,
      {
        data: FUNDING_DATA,
        plotFn: vizType === "bar" ? barPlot : linePlot
      }
    )),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { AutoPlot } from "npm:@one-data/observable-themes/charts"
import * as Plot from "@observablehq/plot"

// plotFn receives the container's current pixel width
const plotFn = (width) => Plot.plot({
  width,
  marks: [
    Plot.barX(data, { x: "value", y: "label", fill: "#1A9BA3" }),
    Plot.ruleX([0]),
  ],
})

// AutoPlot clears the container automatically when data is empty
<AutoPlot data={data} plotFn={plotFn} />` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "AutoTable",
      description: "Horizontally scrollable container for table-like HTMLElements \u2014 designed for use with Observable Framework's Inputs.table() or similar."
    },
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { AutoTable } from "npm:@one-data/observable-themes/charts"

// Observable Framework \u2014 Inputs.table returns an HTMLElement
<AutoTable
  data={data}
  tableFn={(data) => Inputs.table(data, {
    columns: ["country", "year", "amount"],
    header: { country: "Country", year: "Year", amount: "US$ M" },
  })}
/>` })
  ));
}
export {
  Charts as default
};
