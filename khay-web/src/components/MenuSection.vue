<template>
  <section class="menu-section section" id="menu">
    <div class="container">
      <div class="section-icon-wrap">
        <AppIcon name="cake" :size="28" />
      </div>
      <h2 class="section-title">Menu Kami</h2>
      <p class="section-subtitle">Pilih brownies favoritmu dan pesan sekarang!</p>

      <div class="product-grid">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import AppIcon from './AppIcon.vue'
import { products } from '../data/products'
</script>

<style scoped>
/* --- Section Icon --- */
.section-icon-wrap {
  text-align: center;
  margin-bottom: var(--space-md);
  color: var(--secondary);
}

/* --- Menu Section --- */
.menu-section {
  background: var(--bg-cream);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-lg);
  }
}

@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr; }
}
</style>
