<template>
  <div class="flex flex-col gap-10 py-[clamp(32px,4vw,72px)]">
    <UContainer
      class="mx-auto w-full max-w-[960px] rounded-lg border border-(--outline) bg-[radial-gradient(circle_at_20%_20%,rgba(0,220,130,0.16),transparent_40%),theme(colors.glass)] p-[clamp(24px,4vw,48px)] shadow-elevated text-left"
    >
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-center gap-[clamp(20px,3vw,40px)]"
      >
        <div class="flex flex-col gap-4 text-left">
          <h1
            class="m-0 text-[clamp(2.4rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-strong"
          >
            Hi, I'm George
          </h1>
          <p class="m-0 max-w-[720px] text-text-muted">
            I'm George Danicico, an enthusiast software engineer working across the stack with Java and Spring
            Boot, plus a growing love for front-end craft. This space is where I document what I learn, ship
            experiments, and keep leveling up as both a person and a programmer.
          </p>
        </div>

        <div class="relative w-[min(360px,100%)] justify-self-center">
          <div
            class="absolute inset-[8%] rounded-[28px] bg-[radial-gradient(circle_at_30%_25%,rgba(0,220,130,0.24),transparent_50%),radial-gradient(circle_at_75%_60%,rgba(26,188,254,0.2),transparent_55%)] blur-[28px]"
            aria-hidden="true"
          />
          <NuxtImg
            src="/images/me-picture.webp"
            alt="Portrait of George Danicico"
            class="relative z-10 w-full rotate-[-3deg] rounded-[24px] border border-(--outline) bg-[#0b1a32] object-cover shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
            format="webp"
            width="320"
            height="420"
            loading="lazy"
          />
        </div>
      </div>
    </UContainer>

    <UContainer
      class="mx-auto flex w-full max-w-[960px] flex-col gap-5 rounded-lg border border-(--outline) bg-[radial-gradient(circle_at_80%_20%,rgba(26,188,254,0.16),transparent_40%),theme(colors.glass)] p-[clamp(24px,4vw,48px)] shadow-elevated text-left"
    >
      <div class="flex flex-col gap-1.5 text-left">
        <div class="inline-flex items-center gap-2 text-[18px] font-bold text-text-strong">
          <Icon name="mdi:briefcase-outline" size="18" />
          <span>Work Experience</span>
        </div>
        <p class="m-0 text-text-muted">
          Highlights from the last decade across full stack and platform work.
        </p>
      </div>

      <div class="flex flex-col gap-4">
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
