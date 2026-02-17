# CLAUDE.md — AI Assistant Guide for Пишпекские хроники

## Project Overview

A static website hosting a collection of detective novels set in 19th-century Pishpek (modern-day Bishkek, Kyrgyzstan). The site is a literary reading platform with advanced typography, theming, and responsive design. All content is in Russian.

- **URL**: https://bishkek.github.io
- **Hosting**: GitHub Pages (automatic deployment on push to `main`)
- **Technology**: Plain HTML5 + CSS3 + vanilla JavaScript — no build step, no frameworks, no dependencies

## Repository Structure

```
bishkek.github.io/
├── index.html              # Landing page with novel listings
├── demo-fonts.html         # Font showcase/demo page
├── css/
│   └── style.css           # All styles (~1,880 lines)
├── js/
│   └── main.js             # All JavaScript (~373 lines)
├── novels/
│   ├── TEMPLATE_chapter.html        # Master chapter template
│   ├── pishpek-mystery/             # «Пишпекская тайна» (10 chapters)
│   ├── pishpek-eco/                 # «Имя розы ветров» (prologue + 8 chapters + epilogue)
│   ├── pishpek-botanic/             # «Карагачевая роща» (predislovie + 6 chapters + epilogue)
│   ├── pishpek-semiotic/            # «Синтаксис крови» (prologue + 8 chapters + epilogue)
│   ├── karakol-mystery/             # «Каракольский гамбит» (10 chapters)
│   ├── tokmok-mystery/              # «Токмокский гамбит» (8 chapters)
│   └── naryn-mystery/               # «Нарынское дело» (8 chapters)
└── *.md                    # Documentation files
```

## Build & Deployment

There is **no build step**. Files are served as-is by GitHub Pages.

- No `package.json`, `Gemfile`, `_config.yml`, or build tool config exists
- No linters, formatters, or test frameworks are configured
- No CI/CD pipelines (no `.github/workflows/`)
- **Deployment**: Push to `main` → GitHub Pages auto-deploys

## Architecture & Key Files

### HTML

- **`index.html`** — Main landing page with hero, novel cards grid, about section, timeline
- **`novels/TEMPLATE_chapter.html`** — Reference template for all chapter pages. Every chapter HTML file follows this structure
- **Each novel directory** contains:
  - `index.html` — Table of contents for the novel
  - `chapter-N.html` — Individual chapter pages (some novels also have `prologue.html`, `predislovie.html`, `epilogue.html`)
- All HTML uses `lang="ru"` and semantic HTML5 elements (`nav`, `article`, `section`, `header`, `footer`)
- ARIA attributes are used for accessibility (`aria-label`, `aria-expanded`)

### CSS (`css/style.css`)

Single stylesheet with these sections (in order):
1. CSS custom properties / theme variables
2. Reset & base styles
3. Navigation (fixed header, mobile burger menu)
4. Hero section (landing page)
5. Content sections (novels grid, about, timeline)
6. Cards and layouts
7. Footer
8. Reader page styles
9. Table of contents
10. Chapter content & typography
11. Reading progress indicators
12. Font family system (10 font classes: `.font-cormorant`, `.font-ptserif`, etc.)
13. Responsive breakpoints (1024px, 768px, 480px, 360px)
14. Touch device optimizations
15. Theme toggle styles
16. Print styles
17. Animations & keyframes

**Theming** is controlled via `data-theme` attribute on `<html>` with three values: `light`, `sepia`, `dark`. All theme colors use CSS custom properties.

### JavaScript (`js/main.js`)

Single file, vanilla ES6, organized into clearly labeled sections:
1. Theme management (light/dark/sepia via `data-theme` attribute + localStorage)
2. Font size control (4 sizes: small/normal/large/xlarge via CSS classes)
3. Font family selection (10 fonts via CSS classes + dropdown UI)
4. Mobile navigation (burger menu toggle)
5. Smooth scroll (anchor link handling)
6. Nav effects (scroll shadow)
7. Reading progress (scroll percentage bar)
8. Intersection Observer (lazy entrance animations)
9. Keyboard navigation (arrow keys for chapter prev/next)
10. Touch swipe navigation (gesture-based chapter switching)
11. Scroll-to-top button
12. Utility functions (`calculateReadingTime`)

**State persistence** uses `localStorage` with these keys:
- `theme` — current theme (`light` | `sepia` | `dark`)
- `fontSize` — font size (`small` | `normal` | `large` | `xlarge`)
- `fontFamily` — font ID (`cormorant` | `ptserif` | `merriweather` | `crimson` | `literata` | `source` | `plex` | `spectral` | `lora` | `ptsans`)

## Conventions & Patterns

### Adding a New Novel

1. Create a directory under `novels/` (naming pattern: `city-type`, e.g., `karakol-mystery`)
2. Create `index.html` as table of contents, linking to all chapters
3. Copy `novels/TEMPLATE_chapter.html` for each chapter file
4. Update chapter content, title, navigation links (prev/next), and chapter number
5. Navigation chain: first chapter's "prev" links to `index.html`; last chapter's "next" links back to `index.html` or is omitted
6. Add the novel to the main `index.html` landing page (novels grid section)
7. Relative paths for assets: `../../css/style.css`, `../../js/main.js`

### Adding a New Chapter to an Existing Novel

1. Copy `TEMPLATE_chapter.html` (or an adjacent chapter file) into the novel's directory
2. Update: `<title>`, chapter number (`<p class="chapter-number">`), chapter title (`<h1 class="chapter-title">`), and body content within `.chapter-content`
3. Update prev/next navigation links in the new file and the adjacent chapter files
4. Add the chapter link to the novel's `index.html`

### HTML Chapter Structure

Every chapter file must include (in order):
- `<div class="reading-progress">` — progress bar
- `<nav class="nav reader-nav">` — navigation bar with logo, TOC link, theme toggle buttons
- `<article class="chapter">` — main content wrapper
  - `<header class="chapter-header">` — chapter number + title
  - `<div class="chapter-content">` — the actual text
- `<nav class="chapter-nav">` — prev/next chapter links with scroll-to-top button
- `<div class="reader-controls">` — font selector dropdown + font size buttons
- `<footer class="footer">` — site footer
- `<script src="../../js/main.js">` — shared JS (loaded at end of body)

### Google Fonts Loading

All chapter and page files include the same Google Fonts `<link>` tag in `<head>` loading all 10 font families plus Inter (for UI). This is loaded with `display=swap`.

### Code Style

- **No framework or transpilation** — write plain HTML/CSS/JS directly
- **Vanilla ES6 JavaScript** — arrow functions, template literals, optional chaining (`?.`)
- **CSS custom properties** for all theme-dependent values
- **Semantic HTML5** — use `nav`, `article`, `section`, `header`, `footer` appropriately
- **Russian-language UI text** — all user-facing strings are in Russian
- **ARIA labels** on interactive elements (buttons, toggles)
- **Passive event listeners** for scroll and touch events (`{ passive: true }`)
- **Mobile-first responsive** — touch targets 44px+ minimum

### Git Workflow

- Feature branches are used for new novels (pattern: `copilot/add-detective-novel-*` or `claude/*`)
- Merge via pull requests to `main`
- Commit messages are in Russian or descriptive English
- No pre-commit hooks, no CI checks

## Font System

10 font options with full Cyrillic support, all from Google Fonts:

| ID | Font | Style |
|----|------|-------|
| `cormorant` | Cormorant Garamond | Classic elegant (default) |
| `ptserif` | PT Serif | Russian academic |
| `merriweather` | Merriweather | Screen-friendly |
| `crimson` | Crimson Pro | Professional |
| `literata` | Literata | Long-form reading |
| `source` | Source Serif 4 | Modern Adobe |
| `plex` | IBM Plex Serif | Corporate |
| `spectral` | Spectral | Web-optimized |
| `lora` | Lora | Elegant and readable |
| `ptsans` | PT Sans | Sans-serif option |

CSS classes follow the pattern `.font-{id}` (e.g., `.font-literata`).

## Theme System

Three themes controlled by `data-theme` on `<html>`:

| Theme | Background | Text | Use Case |
|-------|-----------|------|----------|
| `light` | `#ffffff` | `#2a2a2a` | Default daytime reading |
| `sepia` | `#f4ecd8` | `#3a2f2a` | Warm/comfortable reading |
| `dark` | `#1a1a1a` | `#d4d4d4` | Nighttime reading |

## Common Pitfalls

- **No build step** — do not introduce `package.json`, bundlers, or transpilers unless explicitly requested
- **Shared JS/CSS** — all pages share a single `style.css` and `main.js`. Changes affect the entire site
- **Relative paths matter** — chapter files use `../../css/style.css` and `../../js/main.js` (two levels up from `novels/novel-name/`)
- **Chapter navigation chain** — when adding/removing chapters, update prev/next links in adjacent chapter files too
- **Google Fonts link** — must be included in every HTML file's `<head>` (it's not centrally injected)
- **localStorage keys** — `theme`, `fontSize`, `fontFamily` are used across all pages; do not rename without updating `main.js`
- **All UI text is Russian** — maintain consistency; do not introduce English-language UI strings
