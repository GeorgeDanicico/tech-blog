<script setup lang="ts">

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/georgedanicico/', icon: 'mdi:linkedin' },
  { label: 'GitHub', href: 'https://github.com/GeorgeDanicico', icon: 'mdi:github' },
  { label: 'Instagram', href: 'https://www.instagram.com/georgedanicico/', icon: 'mdi:instagram' }
] as const

useSeoMeta({
  title: 'Home | Tech Blog',
  description: 'A concise introduction with a portrait and social links.',
  ogTitle: 'Home | Tech Blog',
  ogDescription: 'A concise introduction with a portrait and social links.'
})
</script>

<template>
  <div class="home">
    <UContainer class="intro-card">
      <div class="intro-copy">
        <span class="eyebrow">Hello there</span>
        <h1 class="intro-title">Enthusiast Software Engineer</h1>
        <p class="intro-bio">
          Hello 👋🏻 I’m George Danicico, an enthusiast software engineer. I work as a full stack
          engineer focused on Java and Spring Boot, but I also have a soft spot for Frontend as well as DevOps. This
          tech-blog is where I share what I learn about Java and the experiments that help me grow
          into a better person and programmer each day.
        </p>

        <div class="socials">
          <NuxtLink
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="link.label"
          >
            <Icon :name="link.icon" size="22" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="portrait-frame">
        <div class="portrait-glow" aria-hidden="true" />
        <NuxtImg
          src="/images/me-picture.webp"
          alt="Portrait"
          class="portrait"
          format="webp"
          width="320"
          height="420"
          loading="lazy"
        />
      </div>
    </UContainer>
  </div>
</template>

<style scoped src="./index.css"></style>
