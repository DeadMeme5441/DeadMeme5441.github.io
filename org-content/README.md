# Org Workflow

This folder keeps the Org → Markdown sources that `ox-hugo` exports into
`src/content/`. Each subfolder maps 1:1 with the Astro content collections:

- `blog/` → `src/content/blog`
- `interesting-stuff/` → `src/content/interesting-stuff`
- `thoughts-and-opinions/` → `src/content/thoughts-and-opinions`

## Quick start

1. `.dir-locals.el` already points `org-hugo-base-dir` at `../src`, so exports
   land inside Astro's `src/content` tree.
2. **Blog posts**: copy `blog/post-template.org` to a new file (one Org file per
   article), update the file-level `#+DATE`/`#+DESCRIPTION` and property drawer,
   then export the single subtree with `M-x org-hugo-export-to-md`
   (`C-c C-e H H`).
3. **Interesting stuff / Thoughts**: keep using the provided subtrees inside
   their respective files; duplicate a subtree, update metadata, and export it.
4. Commit the generated Markdown files under `src/content/...` alongside the Org
   source so the site and the Org originals stay in sync.

### Front matter mapping

The project expects the following fields (`src/content.config.ts` enforces the
schema):

| Astro field        | Provided by ox-hugo                                         |
| ------------------ | ---------------------------------------------------------- |
| `title`            | Subtree heading                                            |
| `description`      | File-level `#+DESCRIPTION` or `:EXPORT_DESCRIPTION:`       |
| `pubDate`          | File-level `#+DATE` or `:EXPORT_DATE:`                     |
| `updatedDate`      | Auto-set by `org-hugo-auto-set-lastmod` (`lastmod`)        |
| `tags`             | `:EXPORT_HUGO_TAGS:`                                        |
| `draft`            | `:EXPORT_HUGO_DRAFT:` (defaults false when omitted)        |
| `category`         | `#+HUGO_CUSTOM_FRONT_MATTER: category "..."` (link log)    |
| `link`             | `#+HUGO_CUSTOM_FRONT_MATTER+: link "..."` (link log only)  |

The `content.config.ts` transform step also accepts the default `date` and
`lastmod` keys emitted by ox-hugo and maps them onto Astro's `pubDate` and
`updatedDate` fields automatically, so you can rely on ox-hugo's defaults.

### Category keys for interesting-stuff

Use one of these exact values in the `category` custom front matter so the
Astro page groups items correctly:

```
websites
twitter-posts
videos
books
articles
podcasts
other
```

### Export helpers

Helpful commands from ox-hugo:

- `C-c C-e H H` (`org-hugo-export-to-md`) — export subtree at point
- `C-c C-e H A` (`org-hugo-export-wim-to-md`) — export whole file interactively

All templates start with `EXPORT_HUGO_DRAFT: true` to avoid accidental
publishing. Remove or toggle to `false` before exporting when you are ready to
publish.
