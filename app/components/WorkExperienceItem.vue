<template>
  <article
    class="flex flex-col gap-3.5 p-[18px] rounded-md border border-(--outline) bg-experience-surface shadow-experience text-left"
  >
    <div class="flex items-center gap-3">
      <NuxtImg
        :src="props.logo"
        :alt="props.logoAlt"
        class="w-16 h-16 rounded-full border border-(--outline) bg-[radial-gradient(circle_at_30%_30%,theme(colors.logo-glow),theme(colors.logo-surface))] object-cover shadow-logo"
        width="64"
        height="64"
        loading="lazy"
      />

      <div class="grid gap-0.5 text-left">
        <span class="m-0 font-bold text-lg text-text-strong">{{ props.company }}</span>
        <span class="m-0 text-text-muted text-[15px]">{{ props.role }}</span>
        <span class="m-0 text-accent font-semibold text-sm">{{ props.years }}</span>
      </div>
    </div>

    <ul class="grid gap-2.5 list-none p-0 m-0 text-left">
      <li v-for="point in props.highlights" :key="point" class="grid grid-cols-[auto_1fr] items-start gap-2 text-text-strong">
        <Icon name="mdi:check" size="18" />
        <span class="text-text-muted">{{ point }}</span>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  company: string
  role: string
  years: string
  logo: string
  logoAlt: string
  highlights: string[]
}>();
</script>
