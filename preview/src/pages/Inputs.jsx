import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuMini,
  MultiSelect,
  RangeInput,
  RangeInputMini,
  SegmentedToggle,
  ToggleSwitch,
  ToggleSwitchMini,
} from '@pkg/inputs/index.js'
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const COUNTRIES = [
  'Ethiopia', 'Kenya', 'Nigeria', 'South Africa', 'Tanzania',
  'Uganda', 'Ghana', 'Senegal', 'Rwanda', 'Mozambique',
  'Zambia', 'Zimbabwe', 'Malawi', 'Cameroon', 'Côte d\'Ivoire',
]

const VIEW_OPTIONS = [
  { label: 'Bar chart', value: 'bar' },
  { label: 'Line chart', value: 'line' },
  { label: 'Table', value: 'table' },
]

export default function Inputs() {
  const [dropdown, setDropdown] = useState(null)
  const [dropdownMulti, setDropdownMulti] = useState([])
  const [dropdownMini, setDropdownMini] = useState('Nigeria')
  const [segmented, setSegmented] = useState('bar')
  const [toggle, setToggle] = useState('Table')
  const [toggleMini, setToggleMini] = useState('Off')
  const [range, setRange] = useState([2015, 2022])
  const [rangeSingle, setRangeSingle] = useState(2018)
  const [multiSelect, setMultiSelect] = useState([])

  return (
    <>
      <h1 className="page-title">Inputs</h1>
      <p className="page-desc">
        Interactive controls for filtering and navigating data in Observable Framework pages.
        All inputs share a consistent <code>label / hint / value / onChange</code> API and are
        fully keyboard-accessible.
      </p>

      <Section
        title="DropdownMenu"
        description="Single and multi-select dropdown with optional type-ahead search. Pass any array of strings, { label, value } objects, or a Map as options."
      >
        <div className="demo-grid">
          <div>
            <p className="demo-label">Single select</p>
            <div className="demo-block">
              <DropdownMenu
                label="Country"
                hint="Select one country"
                placeholder="Choose a country…"
                options={COUNTRIES}
                value={dropdown}
                onChange={setDropdown}
              />
              {dropdown && (
                <p className="demo-value">Selected: <strong>{dropdown}</strong></p>
              )}
            </div>
          </div>
          <div>
            <p className="demo-label">Multi-select with search</p>
            <div className="demo-block">
              <DropdownMenu
                label="Countries"
                hint="Select one or more"
                placeholder="Choose countries…"
                options={COUNTRIES}
                value={dropdownMulti}
                onChange={setDropdownMulti}
                multi
                search
              />
              {dropdownMulti.length > 0 && (
                <p className="demo-value">
                  {dropdownMulti.length} selected: <strong>{dropdownMulti.join(', ')}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
        <CodeBlock code={`import { DropdownMenu } from "npm:@one-data/observable-themes/inputs"

// Single select
<DropdownMenu
  label="Country"
  hint="Select one country"
  placeholder="Choose a country…"
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
/>`} />
      </Section>

      <Section
        title="DropdownMenuMini"
        description="Compact inline dropdown for use inside filter rows or toolbars. Same API as DropdownMenu with reduced padding and no separate label element."
      >
        <div className="demo-block demo-row">
          <span className="plain-text demo-inline-label">Filter by country:</span>
          <DropdownMenuMini
            options={COUNTRIES}
            value={dropdownMini}
            onChange={setDropdownMini}
            placeholder="Country"
          />
        </div>
        <CodeBlock code={`import { DropdownMenuMini } from "npm:@one-data/observable-themes/inputs"

<DropdownMenuMini
  options={countries}
  value={value}
  onChange={setValue}
  placeholder="Country"
/>`} />
      </Section>

      <Section
          title="MultiSelect"
          description="Tag-based multi-select with inline search. Selected values appear as removable pills. Press Enter to add, Backspace to remove the last tag."
      >
        <div className="demo-block">
          <MultiSelect
              label="Countries"
              hint="Type to search, Enter to add"
              placeholder="Search and add countries…"
              options={COUNTRIES}
              value={multiSelect}
              onChange={setMultiSelect}
          />
          {multiSelect.length > 0 && (
              <p className="demo-value">
                {multiSelect.length} selected: <strong>{multiSelect.join(', ')}</strong>
              </p>
          )}
        </div>
        <CodeBlock code={`import { MultiSelect } from "npm:@one-data/observable-themes/inputs"

<MultiSelect
  label="Countries"
  hint="Type to search, Enter to add"
  placeholder="Search and add countries…"
  options={countries}
  value={selected}
  onChange={setSelected}
  maxSelected={5}
/>`} />
      </Section>

      <Section
        title="SegmentedToggle"
        description="Mutually exclusive button group for switching between views or categories. Supports a disabled state with an optional tooltip reason."
      >
        <div className="demo-block">
          <SegmentedToggle
            label="Visualisation type"
            hint="Choose how to display the data"
            options={VIEW_OPTIONS}
            value={segmented}
            onChange={setSegmented}
          />
          <p className="demo-value">Active: <strong>{segmented}</strong></p>
        </div>
        <CodeBlock code={`import { SegmentedToggle } from "npm:@one-data/observable-themes/inputs"

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
/>`} />
      </Section>

      <Section
        title="ToggleSwitch"
        description="Two-position switch for binary or paired choices. Accepts custom option labels. Arrow keys navigate between positions."
      >
        <div className="demo-grid">
          <div>
            <p className="demo-label">Standard</p>
            <div className="demo-block">
              <ToggleSwitch
                label="Display mode"
                hint="Switch between table and chart view"
                options={
                  [
                    {label: "Table", value: "table"},
                    {label: "Chart", value: "chart"}
                  ]
                }
                value={toggle}
                onChange={setToggle}
              />
            </div>
          </div>
          <div>
            <p className="demo-label">Mini (inline)</p>
            <div className="demo-block demo-row">
              <ToggleSwitchMini
                options={
                  [
                    { label: "Off", value: false },
                    { label: "On", value: true }
                  ]
                }
                value={toggleMini}
                onChange={setToggleMini}
              />
              <span className="plain-text">{toggleMini === 'On' ? 'Feature enabled' : 'Feature disabled'}</span>
            </div>
          </div>
        </div>
        <CodeBlock code={`import { ToggleSwitch, ToggleSwitchMini } from "npm:@one-data/observable-themes/inputs"

// Standard — with label and hint
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

// Compact — for inline filter rows
<ToggleSwitchMini
  options={
    [
      { label: "Off", value: false },
      { label: "On", value: true }
    ]
  }
  value={enabled}
  onChange={setEnabled}
/>`} />
      </Section>

      <Section
        title="RangeInput"
        description="Dual-thumb range slider paired with numeric inputs. Prevents the lower thumb from exceeding the upper. Use RangeInputMini for a compact single-value version."
      >
        <div className="demo-grid">
          <div>
            <p className="demo-label">Dual-thumb range</p>
            <div className="demo-block">
              <RangeInput
                label="Year range"
                min={2000}
                max={2024}
                step={1}
                value={range}
                onChange={setRange}
              />
              <p className="demo-value">
                Range: <strong>{range[0]} – {range[1]}</strong>
              </p>
            </div>
          </div>
          <div>
            <p className="demo-label">Single-thumb (mini)</p>
            <div className="demo-block">
              <RangeInputMini
                label="Year"
                hint="Select a single year"
                min={2000}
                max={2024}
                step={1}
                value={rangeSingle}
                onChange={setRangeSingle}
                single
              />
              <p className="demo-value">
                Year: <strong>{rangeSingle}</strong>
              </p>
            </div>
          </div>
        </div>
        <CodeBlock code={`import { RangeInput, RangeInputMini } from "npm:@one-data/observable-themes/inputs"

// Dual-thumb — value is [min, max]
<RangeInput
  label="Year range"
  min={2000}
  max={2024}
  step={1}
  value={[startYear, endYear]}
  onChange={([start, end]) => { setStart(start); setEnd(end) }}
/>

// Single-thumb compact — value is a number
<RangeInputMini
  label="Year"
  min={2000}
  max={2024}
  step={1}
  value={year}
  onChange={setYear}
  single
/>`} />
      </Section>
    </>
  )
}
