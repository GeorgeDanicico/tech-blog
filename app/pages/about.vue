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

    <UContainer class="experience-card">
      <div class="experience-header">
        <div class="experience-title">
          <Icon name="mdi:briefcase-outline" size="18" />
          <span>Work Experience</span>
        </div>
        <p class="experience-helper">Highlights from the last decade across full stack and platform work.</p>
      </div>

      <div class="experience-list">
        <WorkExperienceItem
          v-for="experience in experiences"
          :key="experience.company"
          v-bind="experience"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// import { WorkExperienceItem } from 

type WorkExperience = {
  company: string
  role: string
  years: string
  logo: string
  logoAlt: string
  highlights: string[]
}

const experiences: WorkExperience[] = [
  {
    company: 'Betfair Romania Development',
    role: 'Software Engineer',
    years: '2023 — Present',
    logo: '/images/logos/betfair.png',
    logoAlt: 'Betfair logo',
    highlights: [
      'Developed new features and offered maintenance for the owned services with the following technologies: Spring Boot, React, Angular, MySQL, and Couchbase.',
      'Led the migration of a microservice that sends messages to customers to a new Quarkus codebase, which uses MySQL for data storage and Couchbase for distributed caching.',
      'Worked with CI/CD pipelines, using Jenkins for handling continuous integration and GoCD for managing the delivery stages.',
      'Provided on‑call support for the team’s services.'
    ]
  },
  {
    company: 'Montran',
    role: 'Junior Software Engineer',
    years: '2022 — 2023',
    logo: '/images/logos/montran.png',
    logoAlt: 'Montran Logo',
    highlights: [
      'Developed new features for the owned products of the company using Spring and Sql Server.',
      'Developed unit tested APIs with Java.',            
      'Provided support for the clients.'
    ]
  },
  {
    company: 'Macadamian',
    role: 'Junior Frontend Developer',
    years: '2021 — 2022',
    logo: '/images/logos/macadamian.png',
    logoAlt: 'Macadamian logo',
    highlights: [
      'Built a responsive web application with ReactJS, TypeScript, ReduxJS and an entire ecosystem around these libraries.'
    ]
  }
] satisfies WorkExperience[]

// useSeoMeta({
//   title: 'About | Tech Blog',
//   description: 'Meet George, a full stack engineer sharing lessons from Java, Spring Boot, and front-end explorations.',
//   ogTitle: 'About | Tech Blog',
//   ogDescription:
//     'Meet George, a full stack engineer sharing lessons from Java, Spring Boot, and front-end explorations.'
// })
</script>

<style scoped src="./about.css"></style>
