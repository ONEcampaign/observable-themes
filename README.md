# @one-data/observable-themes

Modular CSS and utility JavaScript for styling [Observable Framework](https://observablehq.com/framework) projects. This package provides:

- A fully modular CSS design system
- Dynamic, reusable header and footer generators for framework pages
- ONE's color palettes
- ONE logos in png and favicon formats
- ONE fonts

---

##  Features

- Fully modular CSS (`styles/`) for page structure and components
- Drop-in `main.css` for a complete theme
- Dynamic `generateHeader()` utility with custom page titles and scroll-triggered reactivity
- Dynamic `generateHeader()` utility
- `use-colors` module with ONE's colors and `setCustomColors()` utility to inject custom colors into css stylesheets
- `use-images` module with ONE logos
- Ready for CDN or npm use

---

##  Installation

Install via npm:

```bash
npm install @one-data/observable-themes@latest
```

or directly import into an Observable Framework project:

```js
import {setCustomColors} from "npm:@one-data/observable-themes/use-colors"
```

---

## Usage in Observable Framework

### Basic usage

To include the header, footer, favicon and custom stylesheet in you Observable Framework project, your 
`observablehq.config.js` should look as follows:

```js
import {generateHeader} from "@one-data/observable-themes/header";
import {generateFooter} from "@one-data/observable-themes/footer";
import {icon} from "@one-data/observable-themes/use-images";

export default {
    head: `<link rel="icon" href=${icon} type="image/png" sizes="32x32">`,
    
    header: generateHeader({title: "My project"}),
    footer: generateFooter(),

    style: "custom-stylesheet.css",
    
    // You should use attributes like toc, pager and sidebar to complete your configuration.
    // Avoid defining a theme here. Instead, do so in you in your cutom stylesheet.     
};
```

Additionally, you should include a `custom-stylesheet.css` in your root directory, where you can import the stylesheets
provided by the package. You can import all CSS modules via `main.css`, as well as your Observable theme of choice:

```css 
/* custom-stylesheet.css */
@import url("@one-data/observable-themes/styles/main.css");

@import url("observablehq:theme-air.css");
@import url("observablehq:theme-alt.css");
```

You may also import individual CSS modules for more control:
```css 
/* custom-stylesheet.css */
@import url("@one-data/observable-themes/styles/header.css");
@import url("@one-data/observable-themes/styles/footer.css");
@import url("@one-data/observable-themes/styles/sidebar.css");
```

### Color module

`use-colors` includes a ONE Data colors and a variety of preset color palettes:

- `ONEColors`: Object containing all ONE Data colors in different shades. They named as follows: `[hue][shade]`, where the darkest shade is 0. For example, `ONEColors.teal0` `ONEColors.orange5`.
- `mainColor`: Returns `ONEColors.teal1`
- `secondaryColors`: Object containing `ONEColors.orange1`, `ONEColors.navy0`, `ONEColors.purple1`, `ONEColors.blue1` and `ONEColors.yellow1`. They can be retrieved as follows: `secondaryColors.orange` or `secondaryColors.blue`.
- `ONEPalette`: Object combining `mainColor` and `secondaryColors`. They can be retrieved as follows: `ONEPalette.teal`, `ONEPalette.purple`.
- `greyScale`: Object containing `black`, `darkgrey`, `midGrey`, `lightGrey`, `white`. 

The module also includes the function `applyONEPalette()`, which applies `ONEPalette` and `greyScale` to CSS variables.

```js
import {applyONEPalette} from "@one-data/observable-themes/use-colors"

applyONEPalette()
```

Once called, you may use the colors in your style sheet:

```css
/* custom-stylesheet.css */
h1 {
    background-color: var(--teal);
    color: var(--midGrey)
}
```

For more control over which CSS variables are applied, you can use `setCustomColors()`, which takes a custom color 
palette inside an object and an optional prefix. 

```js
import {setCustomColors} from "@one-data/observable-themes/use-colors"

const myPalette = { 
    teal: '#00f5e1', 
    orange: '#ff9900' 
}

setCustomColors(myPalette, {prefix: "custom"})
```

This will inject your palette into the stylesheet:

```css
p {
    background-color: var(--custom-teal);
    color: var(--custom-orange);
}
```

### Images module

`use-images` gives you access to ONE logos in favicon and high-resolution png form.

```js
import {logo} from "@one-data/observable-themes/use-images"

html`<img src="${logo}" alt=“The ONE Campaign logo:a solid black circle with the word ‘ONE’ in bold white capital letters.”/>`
```

---

## File Structure

```
.
├── assets/  
│   ├── fonts/
│   └── images/
├── styles/                # Modular CSS files
│   ├── code.css
│   ├── fonts.css
│   ├── footer.css
│   ├── header.css
│   ├── main.css
│   ├── overrides.css
│   ├── plot-theme.css
│   ├── sidebar.css
│   ├── table-theme.css
│   └── variables.css
├── header.js              # Inserts header with scroll behavior 
├── footer.js              # Inserts footer
├── use-colors.js          # ONE color palette and `setCustomColors` function
├── use-images.js          # ONE logos
└── package.json
```

---
