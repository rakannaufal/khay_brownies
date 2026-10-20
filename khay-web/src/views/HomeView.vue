<template>
  <div class="home">
    <HeroSection />
    <MenuSection />
    <WhySection />
    <TestimonialCarousel />
  </div>
</template>

<script setup>
import { defineAsyncComponent, hydrateOnInteraction, hydrateOnVisible } from 'vue'

const HeroSection = defineAsyncComponent({
  loader: () => import('../components/HeroSection.vue'),
  hydrate: hydrateOnInteraction(['click', 'focusin']),
})

const MenuSection = defineAsyncComponent({
  loader: () => import('../components/MenuSection.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '200px' }),
})
const WhySection = defineAsyncComponent({
  loader: () => import('../components/WhySection.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '200px' }),
})
const TestimonialCarousel = defineAsyncComponent({
  loader: () => import('../components/TestimonialCarousel.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '200px' }),
})
</script>

<style scoped>
.home {
  overflow: hidden;
}
</style>
