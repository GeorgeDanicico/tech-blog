<template>
  <article
    class="border border-(--outline) rounded-md bg-[linear-gradient(135deg,theme(colors.card-start),theme(colors.card-end))] shadow-elevated overflow-hidden transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-[3px] hover:border-outline-strong hover:shadow-elevated-strong"
  >
    <NuxtLink
      :to="`/blogs/${post.slug}`"
      class="grid grid-cols-[140px_1fr] gap-3 items-center py-3 px-3.5 text-current no-underline max-[640px]:grid-cols-1"
    >
      <div
        class="w-[140px] h-[140px] rounded-sm border border-(--outline) overflow-hidden bg-[radial-gradient(circle_at_40%_30%,theme(colors.image-glow),theme(colors.image-surface))] max-[640px]:w-full max-[640px]:h-[170px]"
      >
        <NuxtImg
          :src="post.image"
          :alt="`${post.title} cover`"
          width="150"
          height="150"
          loading="lazy"
          class="w-full h-full object-cover block"
        />
      </div>

      <div class="grid gap-[6px]">
        <header class="flex flex-col gap-[5px] text-[13px] text-text-muted tracking-[0.01em]">
          <span>{{ formattedDate }}</span>
          <span>{{ post.readTime }}</span>
        </header>

        <h3 class="m-0 text-[17px] leading-[1.3]">
          {{ post.title }}
        </h3>
        <p class="m-0 text-text-muted leading-[1.5]">
          {{ post.description }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

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
