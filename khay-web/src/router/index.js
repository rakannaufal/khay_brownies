import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getPageMetadata } from '../data/site'

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

export function createAppRouter() {
  const router = createRouter({
    history: typeof window === 'undefined' ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0, behavior: 'smooth' }
    }
  })

  router.afterEach((to) => {
    if (typeof document === 'undefined') return
    const metadata = getPageMetadata(to.path)
    document.title = metadata.title
    document.querySelector('meta[name="description"]').content = metadata.description
    document.querySelector('link[rel="canonical"]').href = metadata.url
    for (const key of ['title', 'description', 'url', 'image']) {
      document.querySelector(`meta[property="og:${key}"]`).content = metadata[key]
    }
  })

  return router
}
