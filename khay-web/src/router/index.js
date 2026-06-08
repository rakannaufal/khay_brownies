import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Khay Brownies | Brownies Homemade Terlezat' }
  },
  {
    path: '/product/:slug',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: { title: 'Detail Produk | Khay Brownies' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Khay Brownies'
})

export default router
