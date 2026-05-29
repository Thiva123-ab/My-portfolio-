# Thiva — Portfolio (React + Vite)

A fast, dark-themed personal portfolio with creative motion design, built with
**React 18** and **Vite**. Component-based, no UI framework — just React,
vanilla CSS, and a sprinkle of canvas magic.

![status](https://img.shields.io/badge/status-live-7c5cff) ![react](https://img.shields.io/badge/React-18-18e0c8) ![vite](https://img.shields.io/badge/Vite-5-ff5d8f)

## Features

- **Dark aesthetic** with animated gradient glows and a subtle film grain.
- **Interactive constellation background** drawn on `<canvas>` that reacts to the cursor.
- **Custom cursor** with a smooth trailing ring and hover states.
- **Scroll-reveal** animations (via a reusable `<Reveal>` component + IntersectionObserver).
- **Animated stat counters** and a scroll progress bar.
- **Magnetic buttons** (`useMagnetic` hook) and a **3D tilt** profile card.
- **Spotlight skill cards** that follow the pointer.
- Animated **loader**, **marquee**, and gradient text effects.
- Fully **responsive** with a mobile slide-in menu.
- Respects `prefers-reduced-motion` for accessibility.

## Tech stack

- React 18
- Vite 5
- Plain CSS (custom properties, no preprocessor)

## Project structure

```
.
├── index.html              # Vite entry
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Composes all sections
    ├── index.css           # Theme, layout, animations
    ├── hooks/
    │   ├── useMagnetic.js
    │   └── useReducedMotion.js
    └── components/
        ├── Background.jsx   # Canvas particles + glows + grain
        ├── Cursor.jsx
        ├── ScrollProgress.jsx
        ├── Loader.jsx
        ├── Nav.jsx
        ├── Hero.jsx
        ├── Marquee.jsx
        ├── About.jsx        # Tilt card + animated counters
        ├── Skills.jsx       # Spotlight cards
        ├── Work.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## Customize

- **Content:** edit the data arrays in `src/components/*.jsx` (skills, projects, socials).
- **Colors:** tweak the CSS variables at the top of `src/index.css` (`--accent`, `--grad`, etc.).
- **Copy/text:** update `Hero.jsx`, `About.jsx`, and `Contact.jsx`.

## Deploy (GitHub Pages)

This project builds to a static `dist/` folder, so it works on any static host.

For **GitHub Pages** project sites, set the base path in `vite.config.js`:

```js
export default defineConfig({ plugins: [react()], base: "/My-portfolio-/" });
```

Then build and publish `dist/` (e.g. with the `gh-pages` package or a GitHub Action).
For Netlify/Vercel, just point them at this repo — build command `npm run build`,
output directory `dist`.

---

Designed & built by **Thiva**.
