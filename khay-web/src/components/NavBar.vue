<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="navbar-container container">
      <router-link to="/" class="navbar-logo" @click="menuOpen = false">
        <img src="/images/logo.jpeg" alt="Khay Brownies" class="logo-img" />
        <span class="logo-text">Khay Brownies</span>
      </router-link>

      <button class="hamburger" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navbar-links" :class="{ open: menuOpen }">
        <li>
          <router-link to="/" @click="menuOpen = false">
            <AppIcon name="home" :size="16" /> Beranda
          </router-link>
        </li>
        <li>
          <a href="/#menu" @click="menuOpen = false">
            <AppIcon name="cake" :size="16" /> Menu
          </a>
        </li>
        <li>
          <a href="/#kenapa-kami" @click="menuOpen = false">
            <AppIcon name="heart" :size="16" /> Kenapa Kami
          </a>
        </li>
        <li>
          <a href="/#testimoni" @click="menuOpen = false">
            <AppIcon name="star" :size="16" /> Testimoni
          </a>
        </li>
        <li>
          <a :href="whatsappLink" target="_blank" class="nav-cta" @click="menuOpen = false">
            <AppIcon name="phone" :size="16" /> Hubungi Kami
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { WHATSAPP_NUMBER } from '../data/products'
import AppIcon from './AppIcon.vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Khay Brownies! Saya ingin bertanya tentang produk Anda.')}`

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

// Block body scroll when menu is open on mobile
watch(menuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--navbar-height);
  background: rgba(255, 248, 240, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all var(--transition-base);
}

.navbar.scrolled {
  background: rgba(255, 248, 240, 0.95);
  box-shadow: var(--shadow-navbar);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  z-index: 1001;
}

.logo-img {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-circle);
  object-fit: cover;
  border: 2px solid var(--primary);
  transition: transform var(--transition-bounce);
}

.navbar-logo:hover .logo-img {
  transform: rotate(-10deg) scale(1.1);
}

.logo-text {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--secondary);
  letter-spacing: -0.5px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.navbar-links li a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-body);
  transition: all var(--transition-bounce);
}

.navbar-links li a:hover {
  background: var(--primary);
  color: var(--secondary);
  transform: translateY(-2px);
}

.nav-cta {
  background: var(--secondary) !important;
  color: var(--white) !important;
  box-shadow: var(--shadow-button);
}

.nav-cta:hover {
  background: var(--secondary-light) !important;
  box-shadow: var(--shadow-float) !important;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 8px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 3px;
  background: var(--secondary);
  border-radius: var(--radius-pill);
  transition: all var(--transition-base);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar-links {
    position: fixed;
    top: -100vh;
    left: 0;
    right: 0;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-md);
    background: var(--bg-cream);
    z-index: 1000;
    transition: top 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .navbar-links.open {
    top: 0;
  }

  .navbar-links li a {
    font-size: 1.2rem;
    padding: 12px 28px;
  }
}
</style>
