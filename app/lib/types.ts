export type Article = {
  id: string
  title: string
  description: string
  tags: readonly string[]
  publishedAt: string
  readTime: string
}

export type BlogPostPreview = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  image: string
}
