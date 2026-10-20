<template>
  <section class="why-section section" id="kenapa-kami">
    <div class="container">
      <div class="section-icon-wrap">
        <AppIcon name="heart" :size="28" />
      </div>
      <h2 class="section-title">Kenapa Khay Brownies?</h2>
      <p class="section-subtitle">Bukan brownies biasa, ini brownies penuh cinta!</p>

      <div class="features-grid">
        <div class="feature-card" v-for="(feature, i) in features" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
          <div class="feature-icon">
            <AppIcon :name="feature.icon" :size="32" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

const features = [
  {
    icon: 'cake',
    title: '100% Homemade',
    description: 'Setiap brownies dibuat fresh dari dapur kami dengan tangan penuh cinta!'
  },
  {
    icon: 'star',
    title: 'Bahan Premium',
    description: 'Hanya menggunakan bahan-bahan berkualitas tinggi untuk rasa terbaik.'
  },
  {
    icon: 'package',
    title: 'Packaging Cantik',
    description: 'Dikemas rapi dan estetik, cocok untuk hadiah dan hampers spesial.'
  },
  {
    icon: 'truck',
    title: 'Pesan Mudah',
    description: 'Cukup chat via WhatsApp, kami siap antar brownies ke rumahmu!'
  },
  {
    icon: 'tag',
    title: 'Harga Terjangkau',
    description: 'Rasa premium dengan harga yang ramah di kantong. Worth it banget!'
  },
  {
    icon: 'grid',
    title: 'Banyak Varian',
    description: 'Dari mini cup sampai box jumbo, ada untuk semua momen spesial.'
  }
]
</script>

<style scoped>
/* --- Section Icon --- */
.section-icon-wrap {
  text-align: center;
  margin-bottom: var(--space-md);
  color: var(--secondary);
}

/* --- Why Section --- */
.why-section {
  background: var(--bg-warm);
  position: relative;
}

.why-section::before,
.why-section::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  opacity: 0.08;
}

.why-section::before {
  top: -40px;
  left: -60px;
  background: var(--secondary);
}

.why-section::after {
  bottom: -40px;
  right: -60px;
  background: var(--pink-soft);
  animation-delay: 4s;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-xl);
}

.feature-card {
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-bounce);
  animation: fadeInUp 0.6s ease-out both;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--secondary), var(--pink-soft), var(--accent));
  border-radius: var(--radius-pill);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  color: var(--secondary);
  margin-bottom: var(--space-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--primary-light);
  border-radius: var(--radius-xl);
  transition: all var(--transition-bounce);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(-5deg);
  background: var(--primary);
}

.feature-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: var(--space-sm);
  color: var(--secondary);
}

.feature-desc {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
  font-weight: 600;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
