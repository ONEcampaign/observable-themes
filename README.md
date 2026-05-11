# @one-data/observable-themes

Modular CSS, React components, and utilities for [Observable Framework](https://observablehq.com/framework/) projects. Maintained by [ONE Data](https://data.one.org).

**[Full documentation and component preview →](https://onecampaign.github.io/observable-themes/)**

---

## Installation

```sh
npm install @one-data/observable-themes
```

## Setup

**1. Import the stylesheet** in your project's CSS file:

```css
/* src/style.css */
@import "@one-data/observable-themes/styles/index.css";
```

This brings in typography tokens, font faces (Colfax, Italian Plate No 2), layout styles, and all component styles.

**2. Point your config to the stylesheet:**

```js
// observablehq.config.js
import { icon } from "@one-data/observable-themes/brand"

export default {
  head: `<link rel="icon" href=${icon} type="image/png" sizes="32x32">`,
  style: "src/style.css",
  // ...
}
```

**3. Import components** in your Framework pages using the `npm:` protocol:

```js
import { Header, KPICards }              from "npm:@one-data/observable-themes/ui"
import { DropdownMenu, SegmentedToggle } from "npm:@one-data/observable-themes/inputs"
import { ONEVisual, AutoPlot }           from "npm:@one-data/observable-themes/charts"
import { ONEColors, ONEPalette }         from "npm:@one-data/observable-themes/colors"
import { formatValue, downloadXLSX }    from "npm:@one-data/observable-themes/utils"
```

---

For interactive demos, prop references, and usage examples for every component, visit the **[documentation site](https://onecampaign.github.io/observable-themes/)**.
