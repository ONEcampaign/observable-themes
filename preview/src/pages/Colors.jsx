import React, { useState } from 'react'
import {
  ONEColors,
  ONEPalette,
  greyScale,
} from '@pkg/colors/index.js'
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const COLOR_FAMILIES = [
  { name: 'teal',     tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'orange',   tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'purple',   tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'navy',     tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'yellow',   tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'burgundy', tones: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'blue',     tones: [0, 1, 2, 3, 4] },
  { name: 'red',      tones: [0, 1, 2, 3, 4] },
]

function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function ColorSwatch({ hex, token }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="color-swatch"
      style={{ backgroundColor: hex, display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "space-around", paddingLeft: "1rem"}}
      title={`${token}: ${hex}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
          <>
          <span className={`swatch-label ${luminance(hex) < 0.5 ? 'light' : 'dark'}`}>
            {token}
        </span>
              <span className={`swatch-label ${luminance(hex) < 0.5 ? 'light' : 'dark'}`}>
            {hex}
        </span>
          </>
      )}
    </div>
  )
}

export default function Colors() {
  return (
    <>
      <h1 className="page-title">Colors</h1>
      <p className="page-desc">
        The ONE Data color system. Each family has 8 tones (0 = darkest, 7 = lightest),
        except blue and red which have 5.
      </p>

      <Section
        title="Full palette"
        description="All color families with their full tone range."
      >
        <div className="color-palette">
          {COLOR_FAMILIES.map(({ name, tones }) => (
            <div key={name} className="color-row">
              <span className="color-name">{name}</span>
              {tones.map(i => {
                const token = `${name}${i}`
                const hex = ONEColors[token]
                return hex
                  ? <ColorSwatch key={token} hex={hex} token={token} />
                  : null
              })}
            </div>
          ))}
          <div className="color-row">
            <span className="color-name">grey</span>
            {[0, 1, 2, 3, 4].map(i => {
              const token = `grey${i}`
              const hex = ONEColors[token]
              return hex
                ? <ColorSwatch key={token} hex={hex} token={token} />
                : null
            })}
          </div>
        </div>
        <CodeBlock code={`import { ONEColors } from "npm:@one-data/observable-themes/colors"

// Reference by family + tone
ONEColors.teal1    // "#1A9BA3" — primary teal
ONEColors.orange0  // "#FF5E1F" — darkest orange
ONEColors.navy4    // "#1836DC"
ONEColors.grey3    // "#E5E5E5" — light grey

// Use directly in Observable Plot
import * as Plot from "@observablehq/plot"

Plot.barX(data, { fill: ONEColors.teal1 })
Plot.line(data, { stroke: ONEColors.orange1 })`} />
      </Section>

      <Section
        title="ONE Palette"
        description="The six-color semantic palette used across all ONE Data products. Use these as your primary series colors for charts."
      >
        <div className="palette-grid">
          {Object.entries(ONEPalette).map(([name, hex]) => (
            <div key={name}>
              <div className="palette-tile-swatch" style={{ backgroundColor: hex }} />
              <span className="palette-tile-name">{name}</span>
              <span className="palette-tile-hex">{hex}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={`import { ONEPalette, mainColor, secondaryColors } from "npm:@one-data/observable-themes/colors"

// ONEPalette = { teal, orange, navy, purple, blue, yellow }
// mainColor  = "#1A9BA3" (teal)
// secondaryColors = { orange, navy, purple, blue, yellow }

// Map series to palette colors
Plot.barX(data, {
  fill: d => ONEPalette[d.category] ?? ONEColors.grey2
})`} />
      </Section>

      <Section
        title="Grey scale"
        description="Five neutral tones from black to white."
      >
        <div className="palette-grid">
          {Object.entries(greyScale).map(([name, hex]) => (
            <div key={name}>
              <div
                className="palette-tile-swatch"
                style={{
                  backgroundColor: hex,
                  border: name === 'white' ? '1px solid #e2e8f0' : 'none',
                }}
              />
              <span className="palette-tile-name">{name}</span>
              <span className="palette-tile-hex">{hex}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="CSS custom properties"
        description="Apply palette colors as CSS variables for use in stylesheets and Observable Framework pages."
      >
        <CodeBlock code={`import { applyONEPalette, setCustomColors } from "npm:@one-data/observable-themes/colors"

// Apply the full ONE Data palette to the document root
applyONEPalette()
// Generates: --one-data-teal, --one-data-orange, --one-data-navy,
//            --one-data-purple, --one-data-blue, --one-data-yellow,
//            --one-data-black, --one-data-darkGrey, --one-data-white, ...

// Use in CSS
// fill: var(--one-data-teal);
// color: var(--one-data-navy);

// Or register a custom palette under your own prefix
setCustomColors({ primary: "#1A9BA3", accent: "#FF7F4C" }, { prefix: "brand" })
// Generates: --brand-primary, --brand-accent`} />
      </Section>
    </>
  )
}
