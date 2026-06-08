<template>
  <div id="khay-app">
    <NavBar />
    <main>
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
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
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
