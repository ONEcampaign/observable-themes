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


## Embedding

Importing anything from `npm:@one-data/observable-themes/utils` loads the embed module. When a page runs inside an iframe or with `?embed=true` in its URL, the module adds the `embedded` class to `<html>` and posts `{ height }` to the parent window whenever the page height changes. The height is the `<html>` border-box height rounded up to a whole pixel.

A parent that sizes the iframe to the posted height should load the page with `?embed=true`. A framed page with that flag hides its own overflow, which removes a second scrollbar inside the parent page. A framed page without the flag keeps scrolling, for hosts that embed it at a fixed height.

```html
<iframe id="dashboard" src="https://data-apps.one.org/my-app/index.html?embed=true"></iframe>
<script>
  const iframe = document.getElementById("dashboard")
  window.addEventListener("message", (event) => {
    if (event.source === iframe.contentWindow && typeof event.data?.height === "number") {
      iframe.style.height = `${event.data.height}px`
    }
  })
</script>
```

Framed content must not size itself in `vh` units. Inside an iframe `vh` is the iframe height, so an element with `min-height: 100vh` grows with every posted height and the iframe grows without end.

---

For interactive demos, prop references, and usage examples for every component, visit the **[documentation site](https://onecampaign.github.io/observable-themes/)**.
