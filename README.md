deadmeme.dev — personal site

This repository hosts the main website at `https://deadmeme.dev` using Astro.

Structure
- `/` — home
- `/blog` — long-form posts
- `/devlog` — shorter updates
- `/projects` — projects gallery linking to repos and docs
- `/docs/<project>` — project documentation (copied from each project's `gh-pages` branch at deploy)
- `/resume` — links to `public/resume.pdf`

Deploy
- GitHub Pages with Actions (`.github/workflows/pages.yml`).
- Custom domain: `deadmeme.dev` (CNAME included in publish artifact).

Docs ingestion
- Configure which projects to include under `/docs` in `config/docs-sources.txt` (one repo name per line, owner defaults to `DeadMeme5441`).
- During deploy, the workflow downloads each repo's `gh-pages` branch and places it at `public/docs/<repo>/`.
