let hydration
let hydrated = false

function hydrate() {
  hydration ??= import('./entry-client.js').then(async ({ ready }) => {
    await ready
    hydrated = true
    document.removeEventListener('click', replayClick, true)
  })
  return hydration
}

function replayClick(event) {
  const button = event.target.closest('button')
  if (!button || hydrated) return
  event.preventDefault()
  event.stopImmediatePropagation()
  hydrate().then(() => {
    if (button.isConnected) button.click()
  })
}

// Prioritize the visible images; an early interaction starts hydration immediately.
const afterPaint = () => requestAnimationFrame(() => setTimeout(hydrate, 0))
if (document.readyState === 'complete') afterPaint()
else window.addEventListener('load', afterPaint, { once: true })
document.addEventListener('pointerdown', hydrate, { once: true, passive: true })
document.addEventListener('keydown', hydrate, { once: true })
document.addEventListener('click', replayClick, true)
