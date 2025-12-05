import { computed } from 'vue'

import type { BlogPostPreview } from '~/lib/types'

const blogPosts = [
  {
    slug: 'spring-boot-image-streaming',
    title: 'Streaming images with Spring Boot',
    description: 'An example of streaming images with Spring Boot, giving the feeling of generating an image by AI.',
    date: '2024-12-04',
    readTime: '3 min read',
    image: '/images/blogs/layouts.svg'
  }
] satisfies BlogPostPreview[]

export const useBlogPosts = () => {
  const posts = computed(() => blogPosts)

  return {
    posts
  }
}
