<script setup lang="ts">
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blogs', to: '/blogs' }
] as const

const route = useRoute()

const isActive = (path: string) => route.path === path

const year = new Date().getFullYear()
</script>

<template>
  <div class="app-shell">
    <header class="app-header" aria-label="Primary">
      <div class="header-inner">
        <nav class="header-links">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="header-link"
            :class="{ active: isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <UContainer class="footer-grid">
        <div class="footer-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/blogs">Blogs</NuxtLink>
          <NuxtLink to="'https://github.com/GeorgeDanicico'" target="_blank" rel="noreferrer">
            GitHub
          </NuxtLink>
        </div>
        <span class="footer-note">© {{ year }} George Danicico. All rights reserved.</span>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped src="./default.css"></style>
