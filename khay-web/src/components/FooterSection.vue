<template>
  <footer class="footer">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,60 C360,10 720,90 1080,40 C1260,15 1380,50 1440,30 L1440,0 L0,0 Z" fill="var(--primary-light)" />
      </svg>
    </div>

    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo-wrapper">
            <img src="/images/logo.jpeg" alt="Khay Brownies" class="footer-logo" />
          </div>
          <h3 class="footer-title">Khay Brownies</h3>
          <p class="footer-desc">
            Brownies homemade lezat yang dibuat dengan cinta dan bahan premium pilihan. 
            Setiap gigitan adalah kebahagiaan!
          </p>
          <div class="footer-pirt">
            <span class="pirt-badge">
              <AppIcon name="clipboard" :size="14" /> P-IRT: 2051471012509-31
            </span>
          </div>
        </div>

        <div class="footer-links">
          <h4 class="footer-heading">Menu</h4>
          <ul>
            <li>
              <router-link to="/">
                <AppIcon name="home" :size="14" /> Beranda
              </router-link>
            </li>
            <li>
              <a href="/#menu">
                <AppIcon name="cake" :size="14" /> Produk Kami
              </a>
            </li>
            <li>
              <a href="/#testimoni">
                <AppIcon name="star" :size="14" /> Testimoni
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-contact">
          <h4 class="footer-heading">Hubungi Kami</h4>
          <ul>
            <li>
              <a :href="whatsappLink" target="_blank">
                <AppIcon name="whatsapp" :size="14" /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/khay.brownies" target="_blank">
                <AppIcon name="instagram" :size="14" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-bottom-content">
          <p class="copyright">
            &copy; {{ currentYear }} Khay Brownies. All rights reserved.
          </p>
          <p class="credit">
            Designed by
            <a href="https://www.instagram.com/rakannfls/" target="_blank" class="credit-link">
              <AppIcon name="instagram" :size="13" /> rakannaufal
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { WHATSAPP_NUMBER } from '../data/products'
import AppIcon from './AppIcon.vue'

const currentYear = new Date().getFullYear()
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`
</script>

<style scoped>
.footer {
  background: var(--secondary);
  color: var(--primary-light);
  position: relative;
  padding-top: 60px;
}

.footer-wave {
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
}

.footer-wave svg {
  display: block;
  width: 100%;
  height: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-3xl);
  padding: var(--space-3xl) 0 var(--space-2xl);
}

.footer-logo-wrapper {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-circle);
  overflow: hidden;
  border: 3px solid var(--primary);
  margin-bottom: var(--space-md);
}

.footer-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: var(--space-sm);
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: var(--space-md);
  max-width: 320px;
}

.pirt-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(234, 222, 206, 0.15);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid rgba(234, 222, 206, 0.2);
}

.footer-heading {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--space-md);
}

.footer-links ul,
.footer-contact ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-links li a,
.footer-contact li a {
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all var(--transition-fast);
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.footer-links li a:hover,
.footer-contact li a:hover {
  opacity: 1;
  transform: translateX(4px);
  color: var(--primary);
}

.footer-bottom {
  padding-bottom: var(--space-xl);
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(234, 222, 206, 0.3), transparent);
  margin-bottom: var(--space-lg);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.copyright {
  font-size: 0.85rem;
  opacity: 0.7;
  font-weight: 600;
}

.credit {
  font-size: 0.85rem;
  opacity: 0.7;
  font-weight: 600;
}

.credit-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--primary);
  opacity: 1;
  font-weight: 700;
  transition: all var(--transition-fast);
}

.credit-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: var(--space-lg);
    padding: var(--space-xl) 0 var(--space-lg);
  }
}

@media (max-width: 575px) {
  .footer {
    padding-top: 40px;
  }

  .footer-wave svg {
    height: 40px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    padding: var(--space-lg) 0 var(--space-lg);
    text-align: center;
  }

  .footer-logo-wrapper {
    margin-left: auto;
    margin-right: auto;
  }

  .footer-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .footer-links ul,
  .footer-contact ul {
    align-items: center;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-xs);
  }
}
</style>
