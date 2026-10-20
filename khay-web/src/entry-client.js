import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'
import './assets/fonts.css'
import './assets/main.css'

const root = document.getElementById('app')
const app = root.dataset.prerendered ? createSSRApp(App) : createApp(App)
const router = createAppRouter()
app.use(router)
export const ready = router.isReady().then(() => app.mount(root))
