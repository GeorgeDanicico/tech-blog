# tech-blog

My personal blog, built with [Eleventy](https://www.11ty.dev/) and hosted on GitHub Pages at
https://georgedanicico.github.io/tech-blog/.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:8080/tech-blog/.

## Write a post

Add a Markdown file to `src/posts/`. The file name becomes the URL (`src/posts/my-post.md` → `/posts/my-post/`).

```markdown
---
title: My post
description: One sentence for the meta description.
date: 2026-01-31
readTime: 4 min read
---

Post content…
```

Put images in `src/images/` and link them as `/images/...`.

## Edit the about page

Experience and skills live in `src/_data/resume.js`. Site title, nav, and social links live in `src/_data/site.js`.

## Comments

Comments use [giscus](https://giscus.app), which stores them in this repo's GitHub Discussions.

1. Enable Discussions in the repo settings.
2. Install the [giscus app](https://github.com/apps/giscus) on this repo.
3. On https://giscus.app, pick this repo and the Announcements category, then copy `data-repo-id` and
   `data-category-id` into `giscus` in `src/_data/site.js`.

Comments stay hidden until both IDs are set.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `_site` to GitHub Pages.
In the repo settings, set Pages → Build and deployment → Source to **GitHub Actions**.
