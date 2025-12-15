# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A minimal blog using org-static-blog. Write org files, commit, push - GitHub Actions publishes.

## Workflow

1. Write a post: create `posts/something.org` with `#+TITLE:` and `#+DATE:`
2. Commit and push to master
3. GitHub Actions runs `publish.el` and deploys to GitHub Pages

## Local Preview

```bash
emacs --batch --load publish.el
# Then open public/index.html in a browser
```

## Structure

- `posts/` - Blog posts (org files)
- `drafts/` - Unpublished drafts (org files)
- `static/` - CSS and static assets (copied to public/)
- `publish.el` - org-static-blog configuration
- `public/` - Generated output (gitignored)

## Configuration

Edit `publish.el` to change:
- Site title and URL
- Header/footer HTML
- Number of posts on index page
- Preview settings

Edit `static/style.css` for styling.
