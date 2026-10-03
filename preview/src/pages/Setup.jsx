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

      <Section
        title="Embedding"
        description="Size an iframe to its content without a second scrollbar."
      >
        <p className="preview-section-desc">
          Importing anything from <code>npm:@one-data/observable-themes/utils</code> loads the embed
          module. When a page runs inside an iframe or with <code>?embed=true</code> in its URL, the
          module adds the <code>embedded</code> class to <code>&lt;html&gt;</code> and posts{' '}
          <code>{'{ height }'}</code> to the parent window whenever the page height changes, rounded
          up to a whole pixel.
        </p>
        <p className="preview-section-desc">
          A parent that sizes the iframe to the posted height should load the page with{' '}
          <code>?embed=true</code>. A framed page with that flag hides its own overflow, which removes the
          second scrollbar. A framed page without the flag keeps scrolling, for hosts that
          embed it at a fixed height.
        </p>
        <CodeBlock code={`<iframe id="dashboard" src="https://data-apps.one.org/my-app/index.html?embed=true"></iframe>
<script>
  const iframe = document.getElementById("dashboard")
  window.addEventListener("message", (event) => {
    if (event.source === iframe.contentWindow && typeof event.data?.height === "number") {
      iframe.style.height = \`\${event.data.height}px\`
    }
  })
</script>`} />
        <p className="preview-section-desc">
          Framed content must not size itself in <code>vh</code> units. Inside an iframe{' '}
          <code>vh</code> is the iframe height, so an element with <code>min-height: 100vh</code>{' '}
          grows with every posted height and the iframe grows without end.
        </p>
      </Section>
    </>
  )
}
