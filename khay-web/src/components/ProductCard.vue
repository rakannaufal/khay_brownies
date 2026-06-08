<template>
  <router-link :to="`/product/${product.slug}`" class="product-card card" :style="{ animationDelay: `${index * 0.1}s` }">
    <div class="card-image-wrapper">
      <img :src="product.images[0]" :alt="product.name" class="card-image" loading="lazy" />
      <div class="card-badge" v-if="product.badge">{{ product.badge }}</div>
      <div class="card-overlay">
        <span class="overlay-text">
          <AppIcon name="eye" :size="16" /> Lihat Detail
        </span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-category">
        {{ categoryText }}
      </div>
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-tagline">{{ product.tagline }}</p>
      <div class="card-footer">
        <span class="card-price">{{ formattedPrice }}</span>
        <span class="card-arrow">
          <AppIcon name="arrow-right" :size="16" />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { formatPrice } from '../data/products'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 }
})

const formattedPrice = computed(() => formatPrice(props.product.price))

const categoryMap = {
  mini: 'Mini',
  cup: 'Cup',
  special: 'Special',
  box: 'Box'
}

const categoryText = computed(() => categoryMap[props.product.category] || props.product.category)
</script>

<style scoped>
.product-card {
  display: block;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out both;
  text-decoration: none;
}

.card-image-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .card-image {
  transform: scale(1.08);
}

.card-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: var(--white);
  color: var(--secondary);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 800;
  box-shadow: var(--shadow-card);
  z-index: 2;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(101, 51, 50, 0.6), transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--space-lg);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.product-card:hover .card-overlay {
  opacity: 1;
}

.overlay-text {
  color: var(--white);
  font-weight: 700;
  font-size: 0.95rem;
  background: rgba(255,255,255,0.2);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.card-body {
  padding: var(--space-lg);
}

.card-category {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: var(--space-xs);
}

.card-tagline {
  font-size: 0.88rem;
  color: var(--text-light);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-price {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--secondary);
  background: var(--primary-light);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
}

.card-arrow {
  width: 36px;
  height: 36px;
  background: var(--secondary);
  color: var(--white);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-bounce);
}

.product-card:hover .card-arrow {
  transform: translateX(4px) scale(1.1);
  background: var(--secondary-light);
}
</style>
