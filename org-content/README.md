# Org Workflow

This folder keeps the Org → Markdown sources that `ox-hugo` exports into
`src/content/`. Each subfolder maps 1:1 with the Astro content collections:

- `blog/` → `src/content/blog`
- `interesting-stuff/` → `src/content/interesting-stuff`
- `thoughts-and-opinions/` → `src/content/thoughts-and-opinions`

## Quick start

1. Open any of the `.org` files in Emacs. `.dir-locals.el` already points
   `org-hugo-base-dir` at `../src`, so exports land inside Astro's
   `src/content` tree.
2. Duplicate one of the template subtrees, update the `:EXPORT_*:` properties
   and the `#+HUGO_CUSTOM_FRONT_MATTER` stanzas, then run
   `M-x org-hugo-export-to-md` (or `C-c C-e H H`) on that subtree.
3. Commit the generated Markdown files under `src/content/...` alongside the
   Org source.

### Front matter mapping

The project expects the following fields (`src/content.config.ts` enforces the
schema):

| Astro field        | Provided by ox-hugo                                         |
| ------------------ | ---------------------------------------------------------- |
| `title`            | Subtree heading                                            |
| `description`      | `:EXPORT_DESCRIPTION:`                                     |
| `pubDate`          | `:EXPORT_DATE:` (via `pubDate value(:export_date)`)        |
| `updatedDate`      | Auto-set by `org-hugo-auto-set-lastmod`                    |
| `tags`             | `:EXPORT_HUGO_TAGS:`                                        |
| `draft`            | `:EXPORT_HUGO_DRAFT:` (defaults false when omitted)        |
| `category`         | `#+HUGO_CUSTOM_FRONT_MATTER: category "..."` (link log)    |
| `link`             | `#+HUGO_CUSTOM_FRONT_MATTER+: link "..."` (link log only)  |

The `content.config.ts` transform step also accepts the default `date` and
`lastmod` keys emitted by ox-hugo and maps them onto Astro's `pubDate` and
`updatedDate` fields automatically.

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

The templates in this folder start with `EXPORT_HUGO_DRAFT: true` to avoid
accidental publishing. Remove or toggle to `false` before exporting when you are
ready to publish.
