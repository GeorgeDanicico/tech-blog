<template>
  <div class="py-[clamp(32px,5vw,80px)]">
    <UContainer
      class="mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center justify-items-start gap-[clamp(24px,5vw,56px)] rounded-lg border border-(--outline) bg-[radial-gradient(circle_at_12%_20%,rgba(0,220,130,0.18),transparent_45%),radial-gradient(circle_at_80%_0,rgba(26,188,254,0.15),transparent_40%),theme(colors.glass)] p-[clamp(24px,5vw,56px)] shadow-elevated text-left max-[640px]:justify-items-center max-[640px]:text-center"
    >
      <div class="flex flex-col gap-[18px] max-[640px]:items-center">
        <span
          class="inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.12em] text-text-muted"
        >
          <span class="h-px w-9 bg-outline max-[640px]:hidden" aria-hidden="true" />
          <span>Hello there</span>
        </span>

        <h1
          class="m-0 text-[clamp(2rem,3vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-strong"
        >
          Enthusiast Software Engineer
        </h1>

        <p class="m-0 max-w-[540px] text-text-muted">
          Hello 👋🏻 I’m George Danicico, an enthusiast software engineer. I work as a full stack
          engineer focused on Java and Spring Boot, but I also have a soft spot for Frontend as well as DevOps. This
          tech-blog is where I share what I learn about Java and the experiments that help me grow
          into a better person and programmer each day.
        </p>

        <div class="flex flex-wrap gap-3 max-[640px]:justify-center">
          <NuxtLink
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            class="inline-flex items-center gap-2 rounded-sm border border-(--outline) bg-[rgba(255,255,255,0.04)] px-[14px] py-[10px] text-text-strong transition-[transform,border-color,background-color,color] duration-150 ease-out hover:-translate-y-[2px] hover:border-outline-strong hover:bg-[color-mix(in_srgb,theme(colors.accent)_10%,transparent)]"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="link.label"
          >
            <Icon :name="link.icon" size="22" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="relative flex items-center justify-center">
        <!-- <div
          class="absolute inset-[10%] rounded-[32px] bg-[radial-gradient(circle_at_40%_20%,rgba(0,220,130,0.25),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(26,188,254,0.2),transparent_55%)] blur-[28px]"
          aria-hidden="true"
        /> -->
        <NuxtImg
          src="/images/me-picture.webp"
          alt="Portrait"
          class="relative z-10 w-[min(360px,100%)] rotate-[-3deg] rounded-[26px] border border-(--outline) bg-[#0b1a32] object-cover shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
          format="webp"
          width="320"
          height="420"
          loading="lazy"
        />
      </div>
    </UContainer>
  </div>
</template>


<script setup lang="ts">

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/georgedanicico/', icon: 'mdi:linkedin' },
  { label: 'GitHub', href: 'https://github.com/GeorgeDanicico', icon: 'mdi:github' },
  { label: 'Instagram', href: 'https://www.instagram.com/georgedanicico/', icon: 'mdi:instagram' }
] as const

// useSeoMeta({
//   title: 'Home | Tech Blog',
//   description: 'A concise introduction with a portrait and social links.',
//   ogTitle: 'Home | Tech Blog',
//   ogDescription: 'A concise introduction with a portrait and social links.'
// })
</script>