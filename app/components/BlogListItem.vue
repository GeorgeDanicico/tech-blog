<script setup lang="ts">
import { computed } from 'vue'

import type { BlogPostPreview } from '~/lib/types'

const props = defineProps<{
  post: BlogPostPreview
}>()

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(props.post.date))
)
</script>

<template>
  <article class="blog-item">
    <NuxtLink :to="`/blogs/${post.slug}`" class="blog-item__link">
      <div class="blog-item__image">
        <NuxtImg
          :src="post.image"
          :alt="`${post.title} cover`"
          width="150"
          height="150"
          loading="lazy"
        />
      </div>

      <div class="blog-item__content">
        <header class="blog-item__header">
          <span>{{ formattedDate }}</span>
          <span>{{ post.readTime }}</span>
        </header>

        <h3 class="blog-item__title">
          {{ post.title }}
        </h3>
        <p class="blog-item__description">
          {{ post.description }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped src="./BlogListItem.css"></style>
