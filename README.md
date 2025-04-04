# @one-data/observable-themes

Modular CSS and utility JavaScript for styling [Observable Framework](https://observablehq.com/framework) projects. This package provides:

- A fully modular CSS design system
- A dynamic, reusable header generator for framework pages
- Support for custom headers, footers, cards, plots, and more

---

##  Features

- Fully modular CSS (`styles/`) for page structure and components
- Drop-in `main.css` for a complete theme
- Dynamic `generateHeader()` utility with custom page titles
- Sticky header and footer scripts
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
import { generateHeader } from "@one-data/observable-themes/header-template";

export default {
  title: "ODA Dashboard",
  head: `
    <link rel="stylesheet" href="npm:@one-data/observable-themes/styles/main.css">
    <script src="npm:@one-data/observable-themes/header.js" defer></script>
    <script src="npm:@one-data/observable-themes/footer.js" defer></script>
  `,
  header: generateHeader({title: "App title"}), // Dynamic header with page title
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
├── header.js              # Sticky header scroll behavior
├── footer.js              # Injects footer on page load
├── header-template.js     # `generateHeader` function
├── color-palette.js       # ONE colors and `setCustomColors` function
└── package.json
```

---
