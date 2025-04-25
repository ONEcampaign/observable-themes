# @one-data/observable-themes

Modular CSS and utility JavaScript for styling [Observable Framework](https://observablehq.com/framework) projects. This package provides:

- A fully modular CSS design system
- Dynamic, reusable header and footer generators for framework pages
- ONE's color palette
- ONE logos in png and favicon formats

---

##  Features

- Fully modular CSS (`styles/`) for page structure and components
- Drop-in `main.css` for a complete theme
- Dynamic `generateHeader()` utility with custom page titles and scroll-triggered reactivity
- Dynamic `generateHeader()` utility
- `color-palette` module with ONE's colors and `setCustomColors()` utility to inject custom colors into css stylesheets
- `use-logo` module with access to ONE logos
- Ready for CDN or npm use

---

##  Installation

Install via npm:

```bash
npm install @one-data/observable-themes
```

Or import directly from CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@one-data/observable-themes/styles/main.css">
```

---

## Usage in Observable Framework

In your `observablehq.config.js`:
Note that this would import all styling. 

```js
import { generateHeader } from "@one-data/observable-themes/header";
import { generateFooter } from "@one-data/observable-themes/footer";

export default {
    title: "App title",
    header: generateHeader({title: "App title"}),
    footer: generateFooter()
};
```

The `generateHeader()` function takes a project title and returns the appropriate HTML:

```js
generateHeader({ title: "My Awesome Dashboard" });
```

---

## File Structure

```
.
├── styles/                # Modular CSS files
│   ├── base.css
│   ├── cards.css
│   ├── code.css
│   ├── footer.css
│   ├── header.css
│   ├── main.css
│   ├── plot-theme.css
│   ├── sidebar.css
│   ├── tables.css
│   └── variables.css
├── header.js              # Injects header with scroll behavior 
├── footer.js              # Injects footer
├── use-colors.js          # ONE color palette and `setCustomColors` function
├── use-images.js          # ONE logos
└── package.json
```

---
