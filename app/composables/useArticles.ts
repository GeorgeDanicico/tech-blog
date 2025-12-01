import type { Article } from '~/lib/types'

const articles = [
  {
    id: 'nuxt-setup-quickstart',
    title: 'Kickstarting a Nuxt 3 project the right way',
    description: 'Set up Nuxt 3 with TypeScript, linting, and UI primitives so your project stays maintainable from day one.',
    tags: ['Nuxt', 'TypeScript', 'Tooling'] as const,
    publishedAt: '2024-02-02',
    readTime: '6 min'
  },
  {
    id: 'nuxt-ui-patterns',
    title: 'Designing consistent layouts with Nuxt UI',
    description: 'Use Nuxt UI containers, cards, and buttons to move faster without sacrificing a cohesive look and feel.',
    tags: ['Nuxt UI', 'Design System'] as const,
    publishedAt: '2024-03-18',
    readTime: '4 min'
  },
  {
    id: 'content-workflow',
    title: 'Content workflows for small teams',
    description: 'Draft, review, and ship content using a lightweight workflow that fits within a Nuxt-powered blog.',
    tags: ['Content', 'Process'] as const,
    publishedAt: '2024-04-12',
    readTime: '5 min'
  },
  {
    id: 'performance-checklist',
    title: 'A practical performance checklist for Vue pages',
    description: 'Measure and improve perceived performance with async data strategies and smart loading states.',
    tags: ['Performance', 'Vue'] as const,
    publishedAt: '2024-05-26',
    readTime: '7 min'
  },
  {
    id: 'deployment-notes',
    title: 'Shipping Nuxt apps with confidence',
    description: 'From environment variables to observability, here is what to double-check before every release.',
    tags: ['Deployment', 'Best Practices'] as const,
    publishedAt: '2024-06-08',
    readTime: '6 min'
  }
] satisfies Article[]

export const useArticles = () => {
  const items = computed(() => articles)
  const featured = computed(() => items.value.slice(0, 3))

  return {
    articles: items,
    featured
  }
}
