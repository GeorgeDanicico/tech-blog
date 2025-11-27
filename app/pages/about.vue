<script setup lang="ts">

type WorkExperience = {
  title: string
  years: string
}

const experiences: WorkExperience[] = [
  {
    title: 'Full Stack Engineer — Spring Boot & Nuxt',
    years: '2022 - Present'
  },
  {
    title: 'Backend Engineer — Growth-stage platform',
    years: '2019 - 2022'
  },
  {
    title: 'Software Engineer — Early career',
    years: '2016 - 2019'
  }
] satisfies WorkExperience[]

useSeoMeta({
  title: 'About | Tech Blog',
  description: 'Meet George, a full stack engineer sharing lessons from Java, Spring Boot, and front-end explorations.',
  ogTitle: 'About | Tech Blog',
  ogDescription:
    'Meet George, a full stack engineer sharing lessons from Java, Spring Boot, and front-end explorations.'
})
</script>

<template>
  <div class="about">
    <UContainer class="intro-card">
      <div class="intro-grid">
        <div class="intro">
          <h1 class="intro-title">Hi, I'm George</h1>
          <p class="intro-text">
            I'm George Danicico, an enthusiast software engineer working across the stack with Java and Spring
            Boot, plus a growing love for front-end craft. This space is where I document what I learn, ship
            experiments, and keep leveling up as both a person and a programmer.
          </p>

          <div class="work-section">
            <div class="work-header">
              <Icon name="mdi:briefcase-outline" size="18" />
              <span>Work</span>
            </div>

            <table class="work-table">
              <tbody>
                <tr v-for="experience in experiences" :key="experience.title">
                  <td class="work-title">{{ experience.title }}</td>
                  <td class="work-years">{{ experience.years }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="portrait-wrap">
          <div class="portrait-glow" aria-hidden="true" />
          <NuxtImg
            src="/images/me-picture.webp"
            alt="Portrait of George Danicico"
            class="portrait"
            format="webp"
            width="320"
            height="420"
            loading="lazy"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped src="./about.css"></style>
