<script setup lang="ts">
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blogs', to: '/blogs' }
] as const

const route = useRoute()

const isActive = (path: string) => route.path === path

const year = new Date().getFullYear()

const navLinkClasses =
  'px-[18px] py-2 rounded-full border border-transparent font-semibold tracking-[0.02em] text-text-muted transition-colors duration-200 hover:text-text-strong hover:border-white/20'
const activeNavLinkClasses =
  'text-text-strong bg-[color-mix(in_srgb,theme(colors.accent)_12%,transparent)] border-[color-mix(in_srgb,theme(colors.accent)_50%,transparent)]'
const footerLinkClasses = 'text-text-muted transition-colors duration-200 hover:text-accent'
</script>

<template>
  <div class="flex min-h-screen flex-col text-text-strong">
    <header class="pointer-events-none mt-5 flex w-full justify-center bg-transparent z-50" aria-label="Primary">
      <div
        class="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-[color-mix(in_srgb,theme(colors.surface)_40%,transparent)] px-4 py-2 shadow-[0_15px_40px_rgba(2,6,23,0.45)] backdrop-blur-[16px] max-[768px]:flex-wrap max-[768px]:justify-center"
      >
        <nav class="inline-flex items-center gap-2.5 max-[768px]:flex-wrap">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[navLinkClasses, isActive(item.to) ? activeNavLinkClasses : '']"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 pt-20 pb-[60px]">
      <slot />
    </main>

    <footer class="border-t border-(--outline) bg-[color-mix(in_srgb,theme(colors.surface)_92%,transparent)] backdrop-blur-[20px]">
      <UContainer class="grid justify-items-center gap-[14px] py-[26px]">
        <div class="inline-flex flex-wrap justify-center gap-[18px] text-sm">
          <NuxtLink :class="footerLinkClasses" to="/">Home</NuxtLink>
          <NuxtLink :class="footerLinkClasses" to="/about">About</NuxtLink>
          <NuxtLink :class="footerLinkClasses" to="/blogs">Blogs</NuxtLink>
          <NuxtLink :class="footerLinkClasses" to="'https://github.com/GeorgeDanicico'" target="_blank" rel="noreferrer">
            GitHub
          </NuxtLink>
        </div>
        <span class="text-[13px] text-text-muted">© {{ year }} George Danicico. All rights reserved.</span>
      </UContainer>
    </footer>
  </div>
</template>
