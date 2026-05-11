import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuMini,
  MultiSelect,
  RangeInput,
  RangeInputMini,
  SegmentedToggle,
  ToggleSwitch,
  ToggleSwitchMini
} from "@pkg/inputs/index.js";
import Section from "../components/Section.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
const COUNTRIES = [
  "Ethiopia",
  "Kenya",
  "Nigeria",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Ghana",
  "Senegal",
  "Rwanda",
  "Mozambique",
  "Zambia",
  "Zimbabwe",
  "Malawi",
  "Cameroon",
  "C\xF4te d'Ivoire"
];
const VIEW_OPTIONS = [
  { label: "Bar chart", value: "bar" },
  { label: "Line chart", value: "line" },
  { label: "Table", value: "table" }
];
function Inputs() {
  const [dropdown, setDropdown] = useState(null);
  const [dropdownMulti, setDropdownMulti] = useState([]);
  const [dropdownMini, setDropdownMini] = useState("Nigeria");
  const [segmented, setSegmented] = useState("bar");
  const [toggle, setToggle] = useState("Table");
  const [toggleMini, setToggleMini] = useState("Off");
  const [range, setRange] = useState([2015, 2022]);
  const [rangeSingle, setRangeSingle] = useState(2018);
  const [multiSelect, setMultiSelect] = useState([]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, "Inputs"), /* @__PURE__ */ React.createElement("p", { className: "page-desc" }, "Interactive controls for filtering and navigating data in Observable Framework pages. All inputs share a consistent ", /* @__PURE__ */ React.createElement("code", null, "label / hint / value / onChange"), " API and are fully keyboard-accessible."), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "DropdownMenu",
      description: "Single and multi-select dropdown with optional type-ahead search. Pass any array of strings, { label, value } objects, or a Map as options."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Single select"), /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      DropdownMenu,
      {
        label: "Country",
        hint: "Select one country",
        placeholder: "Choose a country\u2026",
        options: COUNTRIES,
        value: dropdown,
        onChange: setDropdown
      }
    ), dropdown && /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, "Selected: ", /* @__PURE__ */ React.createElement("strong", null, dropdown)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Multi-select with search"), /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      DropdownMenu,
      {
        label: "Countries",
        hint: "Select one or more",
        placeholder: "Choose countries\u2026",
        options: COUNTRIES,
        value: dropdownMulti,
        onChange: setDropdownMulti,
        multi: true,
        search: true
      }
    ), dropdownMulti.length > 0 && /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, dropdownMulti.length, " selected: ", /* @__PURE__ */ React.createElement("strong", null, dropdownMulti.join(", ")))))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { DropdownMenu } from "npm:@one-data/observable-themes/inputs"

// Single select
<DropdownMenu
  label="Country"
  hint="Select one country"
  placeholder="Choose a country\u2026"
  options={["Ethiopia", "Kenya", "Nigeria"]}
  value={value}
  onChange={setValue}
/>

// Multi-select with search
<DropdownMenu
  label="Countries"
  options={countries}
  value={values}
  onChange={setValues}
  multi
  search
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "DropdownMenuMini",
      description: "Compact inline dropdown for use inside filter rows or toolbars. Same API as DropdownMenu with reduced padding and no separate label element."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-block demo-row" }, /* @__PURE__ */ React.createElement("span", { className: "plain-text demo-inline-label" }, "Filter by country:"), /* @__PURE__ */ React.createElement(
      DropdownMenuMini,
      {
        options: COUNTRIES,
        value: dropdownMini,
        onChange: setDropdownMini,
        placeholder: "Country"
      }
    )),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { DropdownMenuMini } from "npm:@one-data/observable-themes/inputs"

<DropdownMenuMini
  options={countries}
  value={value}
  onChange={setValue}
  placeholder="Country"
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "MultiSelect",
      description: "Tag-based multi-select with inline search. Selected values appear as removable pills. Press Enter to add, Backspace to remove the last tag."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      MultiSelect,
      {
        label: "Countries",
        hint: "Type to search, Enter to add",
        placeholder: "Search and add countries\u2026",
        options: COUNTRIES,
        value: multiSelect,
        onChange: setMultiSelect
      }
    ), multiSelect.length > 0 && /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, multiSelect.length, " selected: ", /* @__PURE__ */ React.createElement("strong", null, multiSelect.join(", ")))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { MultiSelect } from "npm:@one-data/observable-themes/inputs"

<MultiSelect
  label="Countries"
  hint="Type to search, Enter to add"
  placeholder="Search and add countries\u2026"
  options={countries}
  value={selected}
  onChange={setSelected}
  maxSelected={5}
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "SegmentedToggle",
      description: "Mutually exclusive button group for switching between views or categories. Supports a disabled state with an optional tooltip reason."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      SegmentedToggle,
      {
        label: "Visualisation type",
        hint: "Choose how to display the data",
        options: VIEW_OPTIONS,
        value: segmented,
        onChange: setSegmented
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, "Active: ", /* @__PURE__ */ React.createElement("strong", null, segmented))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { SegmentedToggle } from "npm:@one-data/observable-themes/inputs"

const options = [
  { label: "Bar chart", value: "bar" },
  { label: "Line chart", value: "line" },
  { label: "Table", value: "table" },
]

<SegmentedToggle
  label="Visualisation type"
  options={options}
  value={view}
  onChange={setView}
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "ToggleSwitch",
      description: "Two-position switch for binary or paired choices. Accepts custom option labels. Arrow keys navigate between positions."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Standard"), /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      ToggleSwitch,
      {
        label: "Display mode",
        hint: "Switch between table and chart view",
        options: [
          { label: "Table", value: "table" },
          { label: "Chart", value: "chart" }
        ],
        value: toggle,
        onChange: setToggle
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Mini (inline)"), /* @__PURE__ */ React.createElement("div", { className: "demo-block demo-row" }, /* @__PURE__ */ React.createElement(
      ToggleSwitchMini,
      {
        options: [
          { label: "Off", value: false },
          { label: "On", value: true }
        ],
        value: toggleMini,
        onChange: setToggleMini
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "plain-text" }, toggleMini === "On" ? "Feature enabled" : "Feature disabled")))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { ToggleSwitch, ToggleSwitchMini } from "npm:@one-data/observable-themes/inputs"

// Standard \u2014 with label and hint
<ToggleSwitch
  label="Display mode"
  options={
    [
      {label: "Table", value: "table"},
      {label: "Chart", value: "chart"}
    ]
  }
  value={mode}
  onChange={setMode}
/>

// Compact \u2014 for inline filter rows
<ToggleSwitchMini
  options={
    [
      { label: "Off", value: false },
      { label: "On", value: true }
    ]
  }
  value={enabled}
  onChange={setEnabled}
/>` })
  ), /* @__PURE__ */ React.createElement(
    Section,
    {
      title: "RangeInput",
      description: "Dual-thumb range slider paired with numeric inputs. Prevents the lower thumb from exceeding the upper. Use RangeInputMini for a compact single-value version."
    },
    /* @__PURE__ */ React.createElement("div", { className: "demo-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Dual-thumb range"), /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      RangeInput,
      {
        label: "Year range",
        min: 2e3,
        max: 2024,
        step: 1,
        value: range,
        onChange: setRange
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, "Range: ", /* @__PURE__ */ React.createElement("strong", null, range[0], " \u2013 ", range[1])))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "demo-label" }, "Single-thumb (mini)"), /* @__PURE__ */ React.createElement("div", { className: "demo-block" }, /* @__PURE__ */ React.createElement(
      RangeInputMini,
      {
        label: "Year",
        hint: "Select a single year",
        min: 2e3,
        max: 2024,
        step: 1,
        value: rangeSingle,
        onChange: setRangeSingle,
        single: true
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "demo-value" }, "Year: ", /* @__PURE__ */ React.createElement("strong", null, rangeSingle))))),
    /* @__PURE__ */ React.createElement(CodeBlock, { code: `import { RangeInput, RangeInputMini } from "npm:@one-data/observable-themes/inputs"

// Dual-thumb \u2014 value is [min, max]
<RangeInput
  label="Year range"
  min={2000}
  max={2024}
  step={1}
  value={[startYear, endYear]}
  onChange={([start, end]) => { setStart(start); setEnd(end) }}
/>

// Single-thumb compact \u2014 value is a number
<RangeInputMini
  label="Year"
  min={2000}
  max={2024}
  step={1}
  value={year}
  onChange={setYear}
  single
/>` })
  ));
}
export {
  Inputs as default
};
