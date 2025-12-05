<template>
  <div class="py-[clamp(24px,4vw,64px)]">
    <UContainer v-if="post" class="mx-auto w-full max-w-4xl">
      <article
        class="grid gap-8 rounded-lg border border-(--outline) bg-[color-mix(in_srgb,theme(colors.surface)_88%,transparent)] p-6 sm:p-8 shadow-elevated"
      >
        <header class="grid gap-3 text-left">
          <p class="m-0 text-sm uppercase tracking-[0.14em] text-text-muted">
            <span v-if="formattedDate">{{ formattedDate }}</span>
          </p>
          <h1
            class="m-0 text-[clamp(2.1rem,3vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-text-strong"
          >
            {{ post?.title }}
          </h1>
          <p v-if="post?.description" class="m-0 text-text-muted">
            {{ post?.description }}
          </p>
        </header>

        <div class="content-body grid gap-5 text-left">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const slug = useRoute().params.slug;

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(post.value.date))
})

useSeoMeta({
  title: post.value?.title ? `${post.value.title} | Tech Blog` : 'Blog | Tech Blog',
  description: post.value?.description ?? ''
})
</script>

<style scoped>
.content-body :deep(p),
.content-body :deep(li) {
  color: var(--text-muted);
  line-height: 1.75;
  margin: 0;
}

.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4) {
  color: var(--text-strong);
  margin: 18px 0 8px;
  line-height: 1.25;
}

.content-body :deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.content-body :deep(pre) {
  background: #0b1a32;
  border: 1px solid var(--outline);
  border-radius: var(--radius-md);
  padding: 14px;
  overflow-x: auto;
  color: #e8edf7;
}

.content-body :deep(a) {
  color: var(--accent);
}

.content-body :deep(a:hover) {
  color: var(--text-strong);
}

.content-body :deep(img) {
  border-radius: var(--radius-md);
  border: 1px solid var(--outline);
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content-body :deep(figure) {
  margin: 0;
  display: grid;
  gap: 8px;
}

.content-body :deep(figcaption) {
  color: var(--text-muted);
  font-size: 14px;
}

.content-body :deep(ul) {
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

.content-body :deep(li::marker) {
  color: var(--accent);
}
</style>
