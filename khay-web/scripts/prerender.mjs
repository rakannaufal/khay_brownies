import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { render, products, getPageMetadata } from '../dist-ssr/entry-server.js'

const dist = resolve('dist')
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const styles = (await readdir(resolve(dist, 'assets'))).filter(file => file.endsWith('.css'))
const css = (await Promise.all(styles.map(file => readFile(resolve(dist, 'assets', file), 'utf8')))).join('\n')
const paths = ['/', ...products.map(product => `/product/${product.slug}`)]
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const path of paths) {
  const { html, teleports } = await render(path)
  const metadata = getPageMetadata(path)
  let page = template
    .replace('<div id="app"></div>', `<div id="app" data-prerendered="true">${html}</div>`)
    .replace('<div id="dialogs"></div>', `<div id="dialogs">${teleports}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(metadata.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${metadata.url}`)

  for (const key of ['title', 'description', 'url', 'image']) {
    page = page.replace(new RegExp(`(<meta property="og:${key}" content=")[^"]*`), `$1${escape(metadata[key])}`)
  }
  if (path !== '/') {
    const product = products.find(item => path === `/product/${item.slug}`)
    page = page.replace(/<link rel="preload" as="image"[^>]+>/, `<link rel="preload" as="image" href="${product.images[0]}" fetchpriority="high" />`)
  }
  // Keep the small shared stylesheet with the HTML to avoid render-blocking round trips.
  page = page.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, '')
    .replace('</head>', `<style>${css}</style>\n  </head>`)
  const directory = resolve(dist, `.${path}`)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), page)
  console.log(`Prerendered ${path}`)
}
