import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { createAppRouter } from './router'
export { products } from './data/products'
export { getPageMetadata } from './data/site'

export async function render(path) {
  const app = createSSRApp(App)
  const router = createAppRouter()
  app.use(router)
  await router.push(path)
  await router.isReady()
  const context = {}
  const html = await renderToString(app, context)
  return { html, teleports: context.teleports?.['#dialogs'] || '' }
}
