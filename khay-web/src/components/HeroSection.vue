<template>
  <section class="hero">
    <!-- Decorative blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Floating decorative shapes -->
    <div class="deco-shape deco-1"></div>
    <div class="deco-shape deco-2"></div>
    <div class="deco-shape deco-3"></div>

    <div class="hero-container container">
      <div class="hero-content">
        <div class="hero-badge animate-bounce-in">
          <AppIcon name="tag" :size="14" /> Homemade with Love
        </div>
        <h1 class="hero-title">
          Brownies <span class="highlight">Homemade</span><br />
          Coklatnya nyoklat <span class="highlight wiggle-text">Banget!</span>
        </h1>
        <p class="hero-description">
          Dibuat dengan cinta dan bahan premium pilihan. Tekstur fudgy, rasa cokelat yang rich, 
          dan topping yang menggoda. Yuk cobain sekarang!
        </p>
        <div class="hero-buttons">
          <a href="#menu" class="btn btn-primary">
            <AppIcon name="cake" :size="18" /> Lihat Menu
          </a>
          <a :href="whatsappLink" target="_blank" class="btn btn-secondary">
            <AppIcon name="chat" :size="18" /> Chat Kami
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-icon-wrap">
              <AppIcon name="package" :size="20" />
            </div>
            <span class="stat-number">500+</span>
            <span class="stat-label">Box Terjual</span>
          </div>
          <div class="stat-item">
            <div class="stat-icon-wrap">
              <AppIcon name="star" :size="20" :filled="true" />
            </div>
            <span class="stat-number">4.9</span>
            <span class="stat-label">Rating</span>
          </div>
          <div class="stat-item">
            <div class="stat-icon-wrap">
              <AppIcon name="heart" :size="20" />
            </div>
            <span class="stat-number">100%</span>
            <span class="stat-label">Homemade</span>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-wrapper">
          <img src="/images/brownis/brownis_box_l.jpeg" alt="Khay Brownies Box" class="main-image" />
          <div class="image-ring"></div>
        </div>
        <div class="floating-card card-1 animate-float">
          <AppIcon name="flame" :size="16" /> Fresh Baked!
        </div>
        <div class="floating-card card-2 animate-float" style="animation-delay: 1s;">
          <AppIcon name="package" :size="16" /> Ready Stock
        </div>
      </div>
    </div>

    <!-- Wave decoration -->
    <div class="hero-wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,40 C280,100 560,0 840,50 C1120,100 1320,20 1440,40 L1440,120 L0,120 Z" fill="var(--bg-cream)" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { WHATSAPP_NUMBER } from '../data/products'
import AppIcon from './AppIcon.vue'

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Khay Brownies!')}`
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: linear-gradient(160deg, var(--primary) 0%, var(--bg-warm) 50%, var(--pink-light) 100%);
  overflow: hidden;
  padding: var(--space-3xl) 0 var(--space-4xl);
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
  position: relative;
  z-index: 2;
}

/* --- Blobs --- */
.blob {
  position: absolute;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: blob 8s ease-in-out infinite;
  opacity: 0.15;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: var(--pink-soft);
  bottom: -50px;
  left: -80px;
  animation-delay: 2s;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: var(--accent);
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

/* --- Floating Decorative Shapes --- */
.deco-shape {
  position: absolute;
  border-radius: var(--radius-circle);
  opacity: 0.12;
  animation: float 4s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

.deco-1 {
  width: 40px;
  height: 40px;
  background: var(--secondary);
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.deco-2 {
  width: 24px;
  height: 24px;
  background: var(--pink-soft);
  top: 25%;
  right: 8%;
  animation-delay: 1s;
  border-radius: var(--radius-md);
}

.deco-3 {
  width: 32px;
  height: 32px;
  background: var(--accent);
  bottom: 30%;
  left: 10%;
  animation-delay: 2s;
  border-radius: var(--radius-lg);
}

/* --- Content --- */
.hero-content {
  animation: slideInLeft 0.8s ease-out;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--white);
  color: var(--secondary);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: var(--shadow-card);
  margin-bottom: var(--space-lg);
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: var(--space-lg);
  color: var(--text-dark);
}

.highlight {
  color: var(--secondary);
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 10px;
  background: var(--pink-soft);
  border-radius: var(--radius-pill);
  z-index: -1;
  opacity: 0.7;
}

.wiggle-text {
  display: inline-block;
  animation: wiggle 2s ease-in-out infinite;
}

.hero-description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-body);
  margin-bottom: var(--space-xl);
  max-width: 480px;
}

.hero-buttons {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
}

/* --- Stats --- */
.hero-stats {
  display: flex;
  gap: var(--space-xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-icon-wrap {
  color: var(--secondary);
  margin-bottom: 2px;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--secondary);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 600;
}

/* --- Image --- */
.hero-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 0.8s ease-out;
}

.image-wrapper {
  position: relative;
  width: 380px;
  height: 380px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30% 70% 53% 47% / 26% 46% 54% 74%;
  box-shadow: var(--shadow-float);
  animation: blob 10s ease-in-out infinite;
  border: 5px solid var(--white);
}

.image-ring {
  position: absolute;
  inset: -16px;
  border-radius: 30% 70% 53% 47% / 26% 46% 54% 74%;
  border: 3px dashed var(--secondary);
  opacity: 0.2;
  animation: blob 10s ease-in-out infinite reverse;
}

.floating-card {
  position: absolute;
  background: var(--white);
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--secondary);
  box-shadow: var(--shadow-card);
  white-space: nowrap;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-1 {
  top: 10%;
  right: -10%;
}

.card-2 {
  bottom: 10%;
  left: -5%;
}

/* --- Wave --- */
.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  z-index: 1;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 80px;
}

/* --- Responsive --- */
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    order: 2;
  }

  .hero-image {
    order: 1;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .image-wrapper {
    width: 280px;
    height: 280px;
  }

  .floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: auto;
    padding: var(--space-2xl) 0 var(--space-3xl);
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .image-wrapper {
    width: 220px;
    height: 220px;
  }

  .hero-stats {
    gap: var(--space-lg);
  }

  .stat-number {
    font-size: 1.1rem;
  }

  .deco-shape {
    display: none;
  }
}
</style>
