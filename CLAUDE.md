# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
- `bun run dev` - Start Astro dev server with hot reload
- `bun run preview` - Preview built site locally

### Build and Deploy
- `bun run build` - Build static site to `dist/`
- `bun run docs:build` - Build documentation from configured repos using `scripts/build-docs.sh`
- `bun run docs:clean` - Clean docs artifacts (`_sources`, `public/docs`, `.venv-docs`)

### Code Formatting
- `bun run format` - Format all files with Prettier

### Package Management
- `bun install` - Install dependencies
- `bun add <package>` - Add new dependency
- `bun add -d <package>` - Add dev dependency

## Architecture Overview

### Site Structure
This is an Astro-based static site hosted at `deadmeme.dev` with integrated documentation:

- **Main Site**: Astro pages in `src/pages/` for home, blog, devlog, projects, resume
- **Docs Integration**: External project docs automatically ingested from GitHub repos during deployment
- **Deploy**: GitHub Pages with custom domain via `.github/workflows/pages.yml`

### Key Files
- `src/layouts/Base.astro` - Main layout with Gurren Lagann theme, navigation, and global styles
- `astro.config.mjs` - Astro configuration (static output, site URL)
- `config/docs-sources.txt` - List of repos to pull docs from (one per line)
- `scripts/build-docs.sh` - Local docs build script (mirrors GitHub Actions logic)

### Docs System
Documentation is pulled from external repositories during build:
- Repos listed in `config/docs-sources.txt` (defaults to `DeadMeme5441` owner)
- Each repo's `gh-pages` branch is cloned to `_sources/<repo>/`
- If `mkdocs.yml` exists, MkDocs builds to `public/docs/<repo>/`
- Site URLs are rewritten to `https://deadmeme.dev/docs/<repo>/` for canonical links

### Theming System
Advanced dual-theme system with anime-inspired designs:

#### Theme Architecture
- **Framework**: Tailwind CSS with custom CSS properties
- **Themes**: 
  - Light theme: Gurren Lagann (hot-blooded, energetic)
  - Dark theme: Neon Genesis Evangelion (psychological, clinical)
- **Switching**: JavaScript-powered theme switcher with localStorage persistence
- **System Integration**: Respects user's OS theme preference

#### Theme Files Structure
```
src/styles/
├── globals.css          # Main Tailwind imports and global styles
├── themes/
│   ├── base.css         # Base CSS custom properties and fallbacks
│   ├── gurren-lagann.css # Light theme with CSS artifacts
│   └── evangelion.css   # Dark theme with CSS artifacts
```

#### CSS Artifacts System
Each theme includes custom CSS artifacts/decorations:

**Gurren Lagann (Light) Artifacts:**
- `.drill` - Spinning golden drill with conic gradients
- `.spiral-energy` - Rotating spiral energy patterns  
- `.kamina-glasses` - Triangular sunglasses shapes
- `.flame-effect` - Animated flame gradients
- `.cape-flow` - Flowing cape/scarf animations
- `.panel-lines` - Mecha panel line scanning effects

**Evangelion (Dark) Artifacts:**
- `.at-field` - Hexagonal AT Field barrier patterns
- `.cross-light` - Glowing crucifixion cross symbol
- `.eva-silhouette` - Angular Eva Unit shapes
- `.magi-terminal` - Green terminal with typing animation
- `.lcl-liquid` - Flowing LCL amber gradients
- `.psych-fragment` - Psychological fragmentation effects
- `.nerv-pattern` - NERV logo-inspired shapes

#### Color System
Uses CSS custom properties mapped to Tailwind:
- `--color-primary-*` - Theme primary colors (spiral red / eva purple)
- `--color-secondary-*` - Secondary colors (drill gold / terminal green)
- `--color-accent-*` - Accent colors (sky cyan / AT field orange)
- `--color-surface-*` - Surface/background colors (light to dark scale)

#### Usage in Components
- Theme-aware Tailwind classes: `bg-surface-50 dark:bg-surface-950`
- CSS artifacts can be added via class names: `<div class="drill"></div>`
- Theme-specific styling: `[data-theme="light"] .btn-drill`

### Dependencies
- **Runtime**: Astro v4.13.1 (static site generator)
- **Styling**: Tailwind CSS v4.1.13, @tailwindcss/typography
- **Dev**: Prettier (code formatting), @astrojs/tailwind integration
- **Docs**: Python ecosystem (mkdocs, mkdocs-material) managed via uv/venv
- **Deploy**: Node 20, Python 3.12, uv package manager in GitHub Actions