# GTG Perfumes Landing Page

A fully responsive, interactive landing page for a premium fragrance subscription service. Built using HTML5, modern CSS3 (Grid & Flexbox), and Vanilla JavaScript.

## Features

- **Fluid Responsiveness**: Scales beautifully across all devices—from large desktop monitors (1440px+) down to narrow mobile screens (375px) without relying on external CSS frameworks.
- **Complex CSS Grid Layouts**: Uses responsive CSS Grids to handle the product gallery, feature lists, pricing matrices, and footer mapping without layout breakage manually managed by extensive media queries. 
- **Interactive Image Gallery**: A custom vanilla JS thumbnail gallery allowing users to navigate between product images cleanly.
- **Dynamic Subscription Options**: Pure CSS (`:has()` pseudo-classes) and lightweight JS logic integrated for a rich checkout selection flow (Single vs Double subscriptions, item configuration).
- **In-Page Search**: A built-in JS page traversal function to help users quickly navigate through content sections.
- **Micro-Animations & Number Counters**: Javascript `IntersectionObserver` smoothly animates data counters when elements scroll into view.

## Technology Stack

- **HTML5**: Semantic tags and accessible structure.
- **CSS3**: 
  - Pure CSS layout logic (No Tailwind or Bootstrap) 
  - CSS Variables and `aspect-ratio` constraints for image boundaries.
  - Native CSS `:has()` pseudo-selectors for form option reveals.
- **JavaScript**: DOM manipulation, layout toggles, gallery carousels, and intersection observers.

## Local Development & Viewing

To view the webpage locally, simply open your terminal in the project directory and run:

```cmd
start index.html
```

## Project Structure

- `index.html`: The main markup structure and application skeleton.
- `css/styles.css`: All layout parameters, design tokens, responsive breakpoints, and styling.
- `js/script.js`: Interactive functionality including the gallery, section highlighting, and counters.
- `assets/`: All SVG iconography, vectors, and optimized raster imagery used on the page.
