<script setup lang="ts">
import type { Article } from '~/lib/types'

const props = defineProps<{
  article: Article
}>()

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(props.article.publishedAt))
)
</script>

<template>
  <article :id="article.id" class="article">
    <UCard class="article-card">
      <div class="card-visual" aria-hidden="true">
        <span>{{ formattedDate }}</span>
      </div>

      <h3 class="card-title">
        {{ article.title }}
      </h3>
      <p class="card-description">
        {{ article.description }}
      </p>

      <div class="card-tags">
        <span v-for="tag in article.tags" :key="tag" class="pill">{{ tag }}</span>
      </div>

      <p class="card-meta">{{ article.readTime }} read • stay curious</p>

      <UButton
        :to="{ path: '/blogs', hash: `#${article.id}` }"
        variant="ghost"
        color="primary"
        size="sm"
        class="card-button"
      >
        View on blog
      </UButton>
    </UCard>
  </article>
</template>

<style scoped src="ArticleCard.css"></style>
