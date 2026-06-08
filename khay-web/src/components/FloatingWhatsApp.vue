<template>
  <a
    :href="whatsappLink"
    target="_blank"
    class="floating-wa"
    aria-label="Chat via WhatsApp"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <div class="wa-pulse"></div>
    <div class="wa-icon">
      <AppIcon name="whatsapp" :size="28" />
    </div>
    <transition name="tooltip">
      <div class="wa-tooltip" v-if="showTooltip">
        Chat kami!
      </div>
    </transition>
  </a>
</template>

<script setup>
import { ref } from 'vue'
import { WHATSAPP_NUMBER } from '../data/products'
import AppIcon from './AppIcon.vue'

const showTooltip = ref(false)

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Khay Brownies! Saya tertarik dengan produk Anda.')}`
</script>

<style scoped>
.floating-wa {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.wa-icon {
  width: 60px;
  height: 60px;
  background: var(--whatsapp-green);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all var(--transition-bounce);
  position: relative;
  z-index: 2;
}

.floating-wa:hover .wa-icon {
  transform: scale(1.1) rotate(-8deg);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
}

.wa-pulse {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: var(--radius-circle);
  background: var(--whatsapp-green);
  animation: waPulse 2s ease-out infinite;
  z-index: 1;
}

@keyframes waPulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.wa-tooltip {
  position: absolute;
  right: 70px;
  background: var(--white);
  color: var(--secondary);
  padding: 8px 16px;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: var(--shadow-card);
}

.wa-tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid var(--white);
}

.tooltip-enter-active {
  animation: fadeInUp 0.3s ease-out;
}

.tooltip-leave-active {
  animation: fadeIn 0.2s ease-in reverse;
}

@media (max-width: 480px) {
  .floating-wa {
    bottom: 20px;
    right: 20px;
  }

  .wa-icon {
    width: 52px;
    height: 52px;
  }

  .wa-pulse {
    width: 52px;
    height: 52px;
  }

  .wa-tooltip {
    display: none;
  }
}
</style>
