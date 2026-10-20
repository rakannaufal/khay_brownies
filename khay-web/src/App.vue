<template>
  <div id="khay-app">
    <a href="#main-content" class="skip-link">Langsung ke konten</a>
    <NavBar />
    <main id="main-content" tabindex="-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
    <FloatingWhatsApp />
  </div>
</template>

<script setup>
import { defineAsyncComponent, hydrateOnInteraction, hydrateOnVisible } from 'vue'
import NavBar from './components/NavBar.vue'

const FooterSection = defineAsyncComponent({
  loader: () => import('./components/FooterSection.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '200px' }),
})
const FloatingWhatsApp = defineAsyncComponent({
  loader: () => import('./components/FloatingWhatsApp.vue'),
  hydrate: hydrateOnInteraction(['pointerover', 'focusin']),
})
</script>

<style scoped>
#khay-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: var(--navbar-height);
}
</style>
