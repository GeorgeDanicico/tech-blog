## Tech blog guide

A static blog built with Eleventy 3 and deployed to GitHub Pages under the `/tech-blog/` path prefix.
Keep it small: plain HTML templates, one CSS file, and no client-side JavaScript beyond the giscus embed.

### Layout

- `eleventy.config.js`: plugins, passthrough copies, filters, and the `pathPrefix`.
- `src/_data/site.js`: site title, nav, social links, giscus settings.
- `src/_data/resume.js`: experience and skills shown on the about page.
- `src/_includes/`: `base.njk` (page shell), `post.njk` (post layout), `comments.njk` (giscus).
- `src/posts/*.md`: posts. `posts.11tydata.js` sets their layout and `/posts/<slug>/` permalink.
- `src/index.njk`, `src/about.njk`, `src/posts.njk`, `src/404.njk`: pages.
- `src/css/style.css`: all styles. Colors are CSS variables with a `prefers-color-scheme: dark` override.

### Conventions

- Write internal links and image paths as root-absolute (`/about/`, `/images/x.png`). `HtmlBasePlugin`
  adds `/tech-blog/` at build time, so never hard-code the prefix.
- Post front matter: `title`, `description`, `date` (YYYY-MM-DD), `readTime`.
- Markdown is not run through a template engine, so `{{ }}` in code samples is safe.
- Code highlighting runs at build time through `@11ty/eleventy-plugin-syntaxhighlight`; token colors live in `style.css`.
- Keep the editor look consistent: monospace font, line-number gutter, `#` heading markers, the blinking caret on the `h1`.
- Respect `prefers-reduced-motion` for any animation.

### Commands

- `npm start`: dev server at http://localhost:8080/tech-blog/
- `npm run build`: build to `_site/`
- Commits follow Conventional Commits.
