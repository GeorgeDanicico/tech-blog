<template>
  <article class="experience-item">
    <div class="experience-meta">
      <NuxtImg :src="props.logo" :alt="props.logoAlt" class="logo" width="64" height="64" loading="lazy" />

      <div class="meta-text">
        <p class="company">{{ props.company }}</p>
        <p class="role">{{ props.role }}</p>
        <p class="years">{{ props.years }}</p>
      </div>
    </div>

    <ul class="highlights">
      <li v-for="point in props.highlights" :key="point" class="highlight">
        <Icon name="mdi:check" size="18" />
        <span>{{ point }}</span>
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

console.log("test");
</script>

<style scoped>
.experience-item {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--outline);
  background: rgba(255, 255, 255, 0.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.experience-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.logo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--outline);
  background: radial-gradient(circle at 30% 30%, rgba(0, 220, 130, 0.25), rgba(5, 15, 31, 0.85));
  object-fit: cover;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35);
}

.meta-text {
  display: grid;
  gap: 2px;
  text-align: left;
}

.company {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-strong);
}

.role {
  margin: 0;
  color: var(--text-muted);
  font-size: 15px;
}

.years {
  margin: 0;
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
}

.highlights {
  text-align: left;
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.highlight {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 8px;
  color: var(--text-strong);
}

.highlight span {
  color: var(--text-muted);
}
</style>
