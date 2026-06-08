<template>
  <div class="product-detail" v-if="product">
    <!-- Back Button -->
    <div class="container">
      <router-link to="/" class="back-button">
        <AppIcon name="arrow-left" :size="16" />
        Kembali ke Menu
      </router-link>
    </div>

    <!-- Product Content -->
    <div class="detail-container container">
      <!-- Image Gallery -->
      <div class="detail-gallery">
        <div class="main-image-wrapper">
          <img :src="activeImage" :alt="product.name" class="detail-main-image" />
          <div class="image-badge" v-if="product.badge">{{ product.badge }}</div>
        </div>
        <div class="thumbnail-row" v-if="product.images.length > 1">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            class="thumbnail"
            :class="{ active: activeImageIndex === i }"
            @click="activeImageIndex = i"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="detail-info">
        <div class="info-category">{{ categoryLabel }}</div>
        <h1 class="info-title">{{ product.name }}</h1>
        <p class="info-tagline">{{ product.tagline }}</p>

        <div class="info-price-wrapper">
          <span class="info-price">{{ formattedPrice }}</span>
          <span class="info-per">/ pcs</span>
        </div>

        <div class="info-divider"></div>

        <p class="info-description">{{ product.description }}</p>

        <!-- Features -->
        <div class="info-features">
          <h3 class="features-title">
            <AppIcon name="sparkle" :size="18" />
            Keunggulan
          </h3>
          <ul>
            <li v-for="(feature, i) in product.features" :key="i">
              <span class="feature-check">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="info-divider"></div>

        <!-- Topping Selection -->
        <div class="topping-section" v-if="product.category === 'cup' && product.toppings && product.toppings.length > 0">
          <h3 class="topping-title">
            <AppIcon name="cup" :size="18" />
            Pilih Topping
          </h3>
          <div class="topping-options">
            <button
              v-for="(topping, i) in product.toppings"
              :key="i"
              class="topping-btn"
              :class="{ active: selectedTopping === topping }"
              @click="selectedTopping = topping"
            >
              {{ topping }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="quantity-section">
          <h3 class="quantity-title">
            <AppIcon name="package" :size="18" />
            Jumlah
          </h3>
          <div class="quantity-control">
            <button class="qty-btn" @click="decreaseQty" :disabled="quantity <= 1">−</button>
            <span class="qty-display">{{ quantity }}</span>
            <button class="qty-btn" @click="increaseQty">+</button>
          </div>
          <span class="qty-total">Total: {{ formattedTotal }}</span>
        </div>

        <!-- Notes -->
        <div class="notes-section">
          <h3 class="notes-title">
            <AppIcon name="edit" :size="18" />
            Catatan (opsional)
          </h3>
          <textarea
            v-model="notes"
            class="notes-input"
            placeholder="Contoh: Mohon packing extra, untuk acara ulang tahun..."
            rows="3"
          ></textarea>
        </div>

        <!-- Order Button -->
        <a :href="whatsappOrderLink" target="_blank" class="btn btn-whatsapp order-btn">
          <AppIcon name="whatsapp" :size="22" />
          Pesan via WhatsApp
        </a>
      </div>
    </div>

    <!-- Related Products -->
    <section class="related-section section" v-if="relatedProducts.length > 0">
      <div class="container">
        <div class="section-icon-wrap">
          <AppIcon name="cake" :size="28" />
        </div>
        <h2 class="section-title">Produk Lainnya</h2>
        <p class="section-subtitle">Mungkin kamu juga suka yang ini!</p>
        <div class="related-grid">
          <ProductCard
            v-for="(p, index) in relatedProducts"
            :key="p.id"
            :product="p"
            :index="index"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div class="not-found container" v-else>
    <div class="not-found-content">
      <h2>Produk Tidak Ditemukan</h2>
      <p>Hmm, brownies yang kamu cari sepertinya tidak ada...</p>
      <router-link to="/" class="btn btn-primary">
        <AppIcon name="home" :size="20" />
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { products, formatPrice, generateWhatsAppLink } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import AppIcon from '../components/AppIcon.vue'

const route = useRoute()

const activeImageIndex = ref(0)
const quantity = ref(1)
const selectedTopping = ref('')
const notes = ref('')

const product = computed(() => {
  return products.find(p => p.slug === route.params.slug)
})

const activeImage = computed(() => {
  if (!product.value) return ''
  return product.value.images[activeImageIndex.value] || product.value.images[0]
})

const formattedPrice = computed(() => product.value ? formatPrice(product.value.price) : '')
const formattedTotal = computed(() => product.value ? formatPrice(product.value.price * quantity.value) : '')

const categoryLabels = {
  mini: 'Mini',
  cup: 'Cup',
  special: 'Special',
  box: 'Box'
}
const categoryLabel = computed(() => product.value ? (categoryLabels[product.value.category] || product.value.category) : '')

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.id !== product.value.id).slice(0, 3)
})

const whatsappOrderLink = computed(() => {
  if (!product.value) return '#'
  return generateWhatsAppLink(product.value.name, quantity.value, selectedTopping.value, notes.value)
})

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

// Reset on route change
watch(() => route.params.slug, () => {
  activeImageIndex.value = 0
  quantity.value = 1
  selectedTopping.value = ''
  notes.value = ''
})
</script>

<style scoped>
/* --- Back Button --- */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
  padding: 10px 24px;
  background: var(--white);
  color: var(--secondary);
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-bounce);
}

.back-button:hover {
  transform: translateX(-4px);
  box-shadow: var(--shadow-card-hover);
  background: var(--primary-light);
}

/* --- Detail Container --- */
.detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  padding-top: var(--space-xl);
  padding-bottom: var(--space-4xl);
  align-items: start;
}

/* --- Gallery --- */
.main-image-wrapper {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.detail-main-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.main-image-wrapper:hover .detail-main-image {
  transform: scale(1.03);
}

.image-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--white);
  color: var(--secondary);
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 800;
  box-shadow: var(--shadow-card);
}

.thumbnail-row {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.thumbnail {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 3px solid transparent;
  transition: all var(--transition-base);
  padding: 0;
  background: none;
}

.thumbnail.active {
  border-color: var(--secondary);
  box-shadow: var(--shadow-card);
}

.thumbnail:hover {
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Info --- */
.detail-info {
  animation: slideInRight 0.6s ease-out;
}

.info-category {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-sm);
}

.info-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--secondary);
  margin-bottom: var(--space-xs);
}

.info-tagline {
  font-size: 1.05rem;
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.info-price-wrapper {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.info-price {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 900;
  color: var(--secondary);
  background: var(--primary);
  padding: 8px 24px;
  border-radius: var(--radius-pill);
}

.info-per {
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 600;
}

.info-divider {
  height: 2px;
  background: linear-gradient(90deg, var(--primary), transparent);
  border-radius: var(--radius-pill);
  margin: var(--space-lg) 0;
}

.info-description {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-body);
  margin-bottom: var(--space-lg);
}

/* --- Features --- */
.info-features {
  margin-bottom: var(--space-md);
}

.features-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: var(--space-sm);
}

.info-features ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.info-features li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-body);
}

.feature-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--primary);
  color: var(--secondary);
  border-radius: var(--radius-circle);
  font-size: 0.75rem;
  font-weight: 900;
  flex-shrink: 0;
}

/* --- Topping --- */
.topping-section {
  margin-bottom: var(--space-lg);
}

.topping-title,
.quantity-title,
.notes-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: var(--space-sm);
}

.topping-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.topping-btn {
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  background: var(--primary-light);
  color: var(--text-body);
  font-weight: 700;
  font-size: 0.85rem;
  border: 2px solid transparent;
  transition: all var(--transition-bounce);
}

.topping-btn:hover {
  border-color: var(--secondary);
  transform: translateY(-2px);
}

.topping-btn.active {
  background: var(--secondary);
  color: var(--white);
  border-color: var(--secondary);
  box-shadow: var(--shadow-button);
}

/* --- Quantity --- */
.quantity-section {
  margin-bottom: var(--space-lg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--primary-light);
  border-radius: var(--radius-pill);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.qty-btn {
  width: 44px;
  height: 44px;
  background: var(--secondary);
  color: var(--white);
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
}

.qty-btn:hover:not(:disabled) {
  background: var(--secondary-light);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-display {
  width: 52px;
  text-align: center;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--secondary);
}

.qty-total {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--accent);
  font-size: 0.95rem;
}

/* --- Notes --- */
.notes-section {
  margin-bottom: var(--space-xl);
}

.notes-input {
  width: 100%;
  padding: 14px 20px;
  border: 2px solid var(--primary);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-body);
  background: var(--white);
  resize: vertical;
  transition: border-color var(--transition-fast);
  outline: none;
}

.notes-input:focus {
  border-color: var(--secondary);
  box-shadow: 0 0 0 4px rgba(101, 51, 50, 0.1);
}

.notes-input::placeholder {
  color: var(--text-light);
  font-weight: 600;
}

/* --- Order Button --- */
.order-btn {
  width: 100%;
  font-size: 1.1rem;
  padding: 18px 32px;
}

/* --- Related Products --- */
.related-section {
  background: var(--primary-light);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-xl);
}

/* --- 404 Not Found --- */
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
}

.not-found-content h2 {
  font-size: 1.8rem;
  margin-bottom: var(--space-sm);
  color: var(--secondary);
}

.not-found-content p {
  color: var(--text-light);
  margin-bottom: var(--space-xl);
  font-weight: 600;
}

/* --- Section Icon --- */
.section-icon-wrap {
  text-align: center;
  margin-bottom: var(--space-md);
  color: var(--secondary);
}

/* --- Responsive --- */
@media (max-width: 968px) {
  .detail-container {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .detail-gallery {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }

  .info-title {
    font-size: 1.8rem;
  }

  .info-price {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
  .info-title {
    font-size: 1.5rem;
  }

  .info-price {
    font-size: 1.3rem;
  }

  .topping-btn {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
