import React from 'react'
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Setup() {
  return (
    <>
      <Section
        title="Installation"
        description="Install the package from npm."
      >
        <CodeBlock code="npm install @one-data/observable-themes" />
      </Section>

      <Section title="Setup">
        <p className="preview-section-desc">
          Import the base stylesheet in your <code>style.css</code> file. This loads the Colfax
          and Italian Plate typefaces, CSS custom properties, resets, and all component styles.
        </p>
        <CodeBlock code={`/* src/style.css */
@import "@one-data/observable-themes/styles/index.css";`} />

        <p className="preview-section-desc">
          Configure <code>observablehq.config.js</code> to point to your stylesheet. You can also
          import the ONE logo favicon from the brand module. We recommend setting up your{' '}
          <code>observablehq.config.js</code> as follows:
        </p>
        <CodeBlock code={`// observablehq.config.js
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
}`} />
      </Section>

      <Section
        title="Importing components"
        description="Components are grouped by module. Import only what you need."
      >
        <CodeBlock code={`import { Header, KPICards } from "npm:@one-data/observable-themes/ui"
import { DropdownMenu, SegmentedToggle } from "npm:@one-data/observable-themes/inputs"
import { ONEVisual, AutoPlot } from "npm:@one-data/observable-themes/charts"
import { ONEColors, ONEPalette } from "npm:@one-data/observable-themes/colors"
import { formatValue, downloadXLSX } from "npm:@one-data/observable-themes/utils"`} />
      </Section>
    </>
  )
}
