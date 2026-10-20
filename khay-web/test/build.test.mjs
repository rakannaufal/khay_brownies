import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const dist = resolve('dist')
const slugs = ['brownis-mini-size', 'brownis-cup-mini', 'cheesecuit', 'brownis-box-m', 'brownis-box-l']

test('robots.txt exposes crawl rules and the sitemap, rather than the SPA fallback', async () => {
  const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8')
  assert.match(robots, /^User-agent: \*/m)
  assert.match(robots, /^Allow: \/$/m)
  assert.doesNotMatch(robots, /<!DOCTYPE|<html/i)
  const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
  for (const slug of slugs) assert.ok(sitemap.includes(`/product/${slug}</loc>`))
})

test('agent discovery files expose readable documentation and an honest capability catalog', async () => {
  const documentation = await readFile(resolve(dist, 'llms.txt'), 'utf8')
  assert.match(documentation, /^# Khay Brownies/m)
  for (const slug of slugs) assert.ok(documentation.includes(`/product/${slug}`))
  const catalog = JSON.parse(await readFile(resolve(dist, '.well-known/ai-catalog.json'), 'utf8'))
  assert.equal(catalog.specVersion, '1.0')
  assert.equal(catalog.host.displayName, 'Khay Brownies')
  assert.deepEqual(catalog.entries, [])
})

for (const path of ['/', ...slugs.map(slug => `/product/${slug}`)]) {
  test(`${path} has readable HTML, matching metadata, and resolvable assets before JavaScript`, async () => {
    const html = await readFile(resolve(dist, `.${path}`, 'index.html'), 'utf8')
    assert.match(html, /data-prerendered="true"/)
    assert.match(html, /<div id="dialogs">/)
    if (path === '/') assert.match(html, /<div id="dialogs"><!--teleport start anchor--><dialog/)
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1)
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1]
    assert.equal(canonical, `https://khay-brownies.vercel.app${path}`)
    assert.ok(html.includes(`property="og:url" content="${canonical}"`))
    assert.match(html, /Website by/)
    assert.match(html, /href="https:\/\/www.instagram.com\/rakandevv\/"/)
    assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/)
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|fonts|images)\/[^"?#]+)"/g)) {
      await access(resolve(dist, `.${asset}`))
    }
  })
}
