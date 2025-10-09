# deadmeme.dev

Personal site built with [Astro](https://astro.build) and content sourced from
Org mode via [ox-hugo](https://ox-hugo.scripter.co/).

## Project layout

```
├── org-content/             # Org sources grouped by collection
│   ├── blog/
│   ├── interesting-stuff/
│   └── thoughts-and-opinions/
├── src/
│   ├── components/
│   ├── content/             # Markdown emitted by ox-hugo
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Key routes:

- `/blog` — long-form posts
- `/interesting-stuff` — curated bookmarks grouped by category
- `/thoughts-and-opinions` — single rolling page for ongoing notes

## Writing workflow (Org → Astro)

1. For long-form posts, copy `org-content/blog/post-template.org` to a new file
   (one Org file per article) and edit the single subtree inside. For bookmark
   feeds and the thoughts log, duplicate the relevant subtree in the existing
   files.
2. Update the file-level `#+DATE`/`#+DESCRIPTION` (for blog posts) and the
   `:EXPORT_*:` properties/custom front matter hints. Link-log
   categories must be one of `websites`, `twitter-posts`, `videos`, `books`,
   `articles`, `podcasts`, `other`.
3. Run `org-hugo-export-to-md` (`C-c C-e H H`) on the subtree. The generated
   Markdown lands in `src/content/...` thanks to `.dir-locals.el`.
4. Commit both the Org source and the exported Markdown.

`content.config.ts` maps ox-hugo's default `date`/`lastmod` fields onto the Astro
schemas, so you only need to manage the standard ox-hugo properties.

## Development

```sh
bun install
bun run dev       # http://localhost:4321
bun run build     # output in dist/
```

Optional checks:

```sh
bun run astro check
```

## Deployment

The repo ships with a GitHub Actions workflow (`.github/workflows/astro.yml`)
that builds the site and publishes the static assets to GitHub Pages. Set the
repository's Pages source to **GitHub Actions** and the action will deploy on
pushes to `main`. A `public/CNAME` file pins the production domain to
`deadmeme.dev`.
