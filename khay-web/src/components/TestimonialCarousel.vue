<template>
  <section class="testimonial-section" id="testimoni">
    <div class="container">
      <div class="section-icon-wrap">
        <AppIcon name="chat" :size="28" />
      </div>
      <h2 class="section-title">Kata Mereka</h2>
      <p class="section-subtitle">Review asli dari pelanggan setia Khay Brownies</p>

      <div class="carousel-wrapper">
        <button class="carousel-btn carousel-prev" @click="prev" aria-label="Previous">
          <AppIcon name="chevron-left" :size="20" />
        </button>

        <div class="carousel-track-container">
          <div class="carousel-track" :style="trackStyle">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="carousel-slide"
            >
              <div class="review-card" @click="openLightbox(review)">
                <img :src="review.image" :alt="`Review ${review.id}`" class="review-image" loading="lazy" />
                <div class="review-hover">
                  <span><AppIcon name="search" :size="16" /> Lihat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-btn carousel-next" @click="next" aria-label="Next">
          <AppIcon name="chevron-right" :size="20" />
        </button>
      </div>

      <!-- Dots -->
      <div class="carousel-dots">
        <button
          v-for="(_, i) in dotCount"
          :key="i"
          class="dot"
          :class="{ active: currentIndex === i }"
          @click="goTo(i)"
          :aria-label="`Go to slide ${i + 1}`"
        />
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div class="lightbox" v-if="lightboxImage" @click="lightboxImage = null">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="lightboxImage = null">
            <AppIcon name="x" :size="18" />
          </button>
          <img :src="lightboxImage" alt="Review" class="lightbox-img" />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { reviews } from '../data/products'
import AppIcon from './AppIcon.vue'

const currentIndex = ref(0)
const slidesPerView = ref(3)
const lightboxImage = ref(null)
let autoplayTimer = null

function updateSlidesPerView() {
  const w = window.innerWidth
  if (w < 480) slidesPerView.value = 1
  else if (w < 768) slidesPerView.value = 2
  else slidesPerView.value = 3
}

const dotCount = computed(() => Math.max(1, reviews.length - slidesPerView.value + 1))

const trackStyle = computed(() => {
  const slideWidth = 100 / slidesPerView.value
  return {
    transform: `translateX(-${currentIndex.value * slideWidth}%)`,
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
})

function next() {
  if (currentIndex.value < dotCount.value - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = dotCount.value - 1
  }
}

function goTo(i) {
  currentIndex.value = i
}

function openLightbox(review) {
  lightboxImage.value = review.image
}

function startAutoplay() {
  autoplayTimer = setInterval(next, 4000)
}

function stopAutoplay() {
  clearInterval(autoplayTimer)
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
  stopAutoplay()
})
</script>

<style scoped>
.testimonial-section {
  padding: var(--space-4xl) 0;
  background: var(--primary-light);
  position: relative;
  overflow: hidden;
}

.testimonial-section::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--bg-cream);
  border-radius: 0 0 50% 50%;
}

.section-icon-wrap {
  text-align: center;
  margin-bottom: var(--space-md);
  color: var(--secondary);
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  position: relative;
}

.carousel-track-container {
  flex: 1;
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.carousel-track {
  display: flex;
}

.carousel-slide {
  min-width: calc(100% / 3);
  padding: 0 var(--space-sm);
  box-sizing: border-box;
}

.review-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-bounce);
  aspect-ratio: 3 / 4;
}

.review-card:hover {
  transform: scale(1.03);
  box-shadow: var(--shadow-card-hover);
}

.review-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-hover {
  position: absolute;
  inset: 0;
  background: rgba(101, 51, 50, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
  border-radius: var(--radius-xl);
}

.review-card:hover .review-hover {
  opacity: 1;
}

.review-hover span {
  background: var(--white);
  color: var(--secondary);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Carousel Controls */
.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-circle);
  background: var(--white);
  color: var(--secondary);
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-bounce);
}

.carousel-btn:hover {
  background: var(--secondary);
  color: var(--white);
  transform: scale(1.1);
}

/* Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-circle);
  background: var(--primary-dark);
  transition: all var(--transition-base);
}

.dot.active {
  background: var(--secondary);
  width: 28px;
  border-radius: var(--radius-pill);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
  padding: var(--space-lg);
}

.lightbox-content {
  position: relative;
  max-width: 500px;
  width: 100%;
  animation: bounceIn 0.4s ease-out;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: var(--white);
  color: var(--secondary);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-float);
}

@media (max-width: 768px) {
  .carousel-slide {
    min-width: 50%;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    min-width: 100%;
  }
}
</style>
