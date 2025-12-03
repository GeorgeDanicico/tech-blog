import { computed } from 'vue'

import type { BlogPostPreview } from '~/lib/types'

const blogPosts = [
  {
    slug: 'nuxt-ui-blog-listing',
    title: 'Ship reliable blog listings with Nuxt UI',
    description: 'Blend Nuxt UI cards, dark glass styling, and predictable data to make the blogs index feel premium.',
    date: '2024-07-08',
    readTime: '8 min read',
    image: '/images/blogs/layouts.svg'
  },
  {
    slug: 'spring-boot-ci-hand-off',
    title: 'Bringing Spring Boot release notes to the frontend',
    description: 'Move backend changes into digestible release notes with a short trail of highlights for readers.',
    date: '2024-06-28',
    readTime: '6 min read',
    image: '/images/blogs/pipelines.svg'
  },
  {
    slug: 'performance-budgets-nuxt',
    title: 'Performance budgets for Nuxt content',
    description: 'Set budgets and track LCP when shipping long-form articles with images and pagination.',
    date: '2024-05-30',
    readTime: '7 min read',
    image: '/images/blogs/interfaces.svg'
  },
  {
    slug: 'ui-patterns-for-content',
    title: 'UI patterns that keep content legible',
    description: 'Rhythm, spacing, and card shapes that make technical writing easier to parse on any screen.',
    date: '2024-05-12',
    readTime: '9 min read',
    image: '/images/blogs/layouts.svg'
  },
  {
    slug: 'java-to-nuxt-handshake',
    title: 'Java service handoff to Nuxt pages',
    description: 'Translate service results into post metadata with minimal glue code across the stack.',
    date: '2024-04-18',
    readTime: '5 min read',
    image: '/images/blogs/pipelines.svg'
  },
  {
    slug: 'devops-diary',
    title: "DevOps diary: pipelines that don't wake you up",
    description: 'Documenting build steps, alerts, and safe rollbacks without losing sleep.',
    date: '2024-03-22',
    readTime: '11 min read',
    image: '/images/blogs/pipelines.svg'
  },
  {
    slug: 'designing-dark-themes',
    title: 'Designing a dark reading surface',
    description: 'Layered glass, bright accents, and generous padding keep the reading experience calm.',
    date: '2024-02-27',
    readTime: '6 min read',
    image: '/images/blogs/interfaces.svg'
  },
  {
    slug: 'tiny-experiments',
    title: 'Tiny experiments that keep learning alive',
    description: 'Short write-ups on profiling, code review drills, and pairing notes.',
    date: '2024-01-19',
    readTime: '4 min read',
    image: '/images/blogs/layouts.svg'
  }
] satisfies BlogPostPreview[]

export const useBlogPosts = () => {
  const posts = computed(() => blogPosts)

  return {
    posts
  }
}
