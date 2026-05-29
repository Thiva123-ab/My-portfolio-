# Thiva — Portfolio

A fast, fully static, dark-themed personal portfolio with creative motion design.
No frameworks, no build step — just clean HTML, CSS, and vanilla JavaScript.

![status](https://img.shields.io/badge/status-live-7c5cff) ![type](https://img.shields.io/badge/static-no--build-18e0c8)

## Features

- **Dark aesthetic** with animated gradient glows and a subtle film grain.
- **Interactive constellation background** drawn on `<canvas>` that reacts to the cursor.
- **Custom cursor** with a smooth trailing ring and hover states.
- **Scroll-reveal** animations, animated stat counters, and a scroll progress bar.
- **Magnetic buttons** and a **3D tilt** profile card.
- **Spotlight skill cards** that follow the pointer.
- Animated **loader**, **marquee**, and gradient text effects.
- Fully **responsive** with a mobile slide-in menu.
- Respects `prefers-reduced-motion` for accessibility.

## Project structure

```
.
├── index.html      # Markup & content
├── css/
│   └── style.css   # Theme, layout, animations
├── js/
│   └── main.js     # Cursor, particles, reveal, counters, tilt
└── README.md
```

## Run locally

It's static — just open `index.html` in a browser, or serve it:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Customize

- **Text & sections:** edit `index.html`.
- **Colors:** tweak the CSS variables at the top of `css/style.css` (`--accent`, `--grad`, etc.).
- **Content:** update the work items, skills, stats, email, and social links.

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` → `/root` → **Save**.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

---

Designed & built by **Thiva**.
