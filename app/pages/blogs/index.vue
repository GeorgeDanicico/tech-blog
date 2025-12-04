<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'

import BlogListItem from '~/components/BlogListItem.vue'
import { useBlogPosts } from '~/composables/useBlogPosts'

const { posts } = useBlogPosts()

const page = ref(1)
const pageSize = 5
const query = ref('')

const filteredPosts = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) {
    return posts.value
  }

  return posts.value.filter((post) => post.title.toLowerCase().includes(term))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)))
const paginatedPosts = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredPosts.value.slice(start, start + pageSize)
})

const rangeStart = computed(() => (filteredPosts.value.length === 0 ? 0 : (page.value - 1) * pageSize + 1))
const rangeEnd = computed(() => Math.min(page.value * pageSize, filteredPosts.value.length))
const rangeLabel = computed(() => {
  if (filteredPosts.value.length === 0) {
    return 'No posts match your search.'
  }
  return `Showing ${rangeStart.value}-${rangeEnd.value} of ${filteredPosts.value.length}`
})

const resultsLabel = computed(() => {
  const count = filteredPosts.value.length
  return `${count} ${count === 1 ? 'post' : 'posts'}`
})

watchEffect(() => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value
  }
  if (page.value < 1) {
    page.value = 1
  }
})

watch(
  () => query.value,
  () => {
    page.value = 1
  }
)

// useSeoMeta({
//   title: 'Blogs | Tech Blog',
//   description: 'Browse technical posts with compact previews, search, and pagination.',
//   ogTitle: 'Blogs | Tech Blog',
//   ogDescription: 'Browse technical posts with compact previews, search, and pagination.'
// })
</script>

<template>
  <div class="blogs-page">
    <section class="blogs-hero">
      <UContainer class="hero-card">
        <h2 class="title-lg">Technical blogs I document to learn more.</h2>
      </UContainer>
    </section>

    <section class="blogs-list">
      <UContainer class="list-panel">
        <div class="list-header">
          <div>
            <p class="list-label">Latest entries</p>
            <p class="range-label">{{ rangeLabel }}</p>
          </div>
          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="Search by title"
            size="lg"
          />
        </div>

        <div class="posts-list" aria-live="polite">
          <template v-if="filteredPosts.length">
            <BlogListItem
              v-for="post in paginatedPosts"
              :key="post.slug"
              :post="post"
            />
          </template>
          <div v-else class="empty-state">
            <h2 class="title-md">No posts found</h2>
            <p>Try another keyword to find a match.</p>
          </div>
        </div>

        <div v-if="filteredPosts.length > pageSize" class="pagination-row">
          <div class="pagination-shell">
            <UPagination
              v-model:page="page"
              :total="filteredPosts.length"
              :items-per-page="pageSize"
              :sibling-count="1"
              :show-controls="true"
              size="lg"
              color="primary"
              active-color="primary"
              variant="soft"
              active-variant="solid"
              class="pagination"
            />
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped src="./index.css"></style>
