<script setup lang="ts">
import { useArticles } from '~~/composables/useArticles'

const { articles } = useArticles()

const query = ref('')

const filteredArticles = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) {
    return articles.value
  }

  return articles.value.filter((article) => {
    const matchesTitle = article.title.toLowerCase().includes(term)
    const matchesDescription = article.description.toLowerCase().includes(term)
    const matchesTags = article.tags.some((tag) => tag.toLowerCase().includes(term))

    return matchesTitle || matchesDescription || matchesTags
  })
})

const resultsLabel = computed(() => {
  const count = filteredArticles.value.length
  const noun = count === 1 ? 'article' : 'articles'
  return `${count} ${noun} found`
})

useSeoMeta({
  title: 'Blog | Tech Blog',
  description: 'Browse mock articles with Nuxt UI cards and a simple search experience.',
  ogTitle: 'Blog | Tech Blog',
  ogDescription: 'Browse mock articles with Nuxt UI cards and a simple search experience.'
})
</script>

<template>
  <div class="blogs-page">
    <section class="blogs-hero">
      <UContainer class="blogs-frame">
        <span class="badge-accent">Nuxt UI archive</span>
        <h1 class="title-lg">Centered entries for calm reading.</h1>
        <p>
          Search through notes on delivery pipelines, UI polish, and experimentation logs. Everything stays
          aligned and rendered inside this dark, green-tinted layout.
        </p>

        <div class="placeholder-media archive-media" aria-hidden="true">
          <figure>
            <span>Archive preview</span>
            <strong>Filtering concept</strong>
            <div class="archive-pill-row">
              <span class="pill">Deployment</span>
              <span class="pill">Design systems</span>
              <span class="pill">Playbooks</span>
            </div>
          </figure>
        </div>

        <div class="search-panel">
          <p class="label">Search the archive</p>
          <UInput
            v-model="query"
            placeholder="Filter by title, description, or tag"
            size="lg"
            clearable
            class="search-input"
          />
          <p class="helper-text">{{ resultsLabel }}</p>
        </div>
      </UContainer>
    </section>

    <section aria-live="polite" class="blogs-list">
      <UContainer>
        <div v-if="filteredArticles.length === 0" class="empty-state">
          <h2 class="title-md">No matches found</h2>
          <p>Try a different keyword or clear the search to browse everything.</p>
        </div>
        <div v-else class="blogs-grid">
          <ArticleCard
            v-for="article in filteredArticles"
            :key="article.id"
            :article="article"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped src="./blogs.css"></style>
