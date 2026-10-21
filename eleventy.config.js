import { HtmlBasePlugin } from '@11ty/eleventy'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'

export default function (eleventyConfig) {
  // Rewrites absolute URLs ("/about/", "/images/...") to include pathPrefix.
  eleventyConfig.addPlugin(HtmlBasePlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/robots.txt')

  eleventyConfig.addCollection('posts', (collectionApi) =>
    collectionApi.getFilteredByGlob('src/posts/*.md').reverse()
  )

  eleventyConfig.addFilter('isoDate', (date) => new Date(date).toISOString().slice(0, 10))
  eleventyConfig.addGlobalData('currentYear', new Date().getFullYear())
}

export const config = {
  dir: {
    input: 'src',
    output: '_site'
  },
  // Keep "{{ }}" inside code samples in posts as literal text.
  markdownTemplateEngine: false,
  // GitHub Pages serves the site from /tech-blog/; Vercel previews serve it from the root.
  pathPrefix: process.env.VERCEL ? '/' : '/tech-blog/'
}
