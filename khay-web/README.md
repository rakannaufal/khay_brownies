# Khay Brownies

Vue 3 storefront with a product catalog, customer reviews, and WhatsApp ordering.

## Development

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm test
npm run preview
```

The build creates static HTML for the homepage and all five product routes in
`dist/`. Vue hydrates navigation immediately; other sections hydrate when visible
or on interaction. Content and links remain readable before JavaScript loads.
The server bundle in `dist-ssr/` is used only during the build.

Deploy `dist/` to Vercel with the project root set to `khay-web` and build command
`npm run build`. `vercel.json` configures SPA navigation fallback and asset caching.
No environment variables or backend service are required.

Product data and image dimensions live in `src/data/products.js`. The public URL
and page metadata live in `src/data/site.js`; keep the URL synchronized with
`index.html`, `public/robots.txt`, and `public/sitemap.xml` if the domain changes.
New products need an entry in the sitemap; their HTML is generated automatically.

## Images And Fonts

Original JPEGs remain in `public/images/`. Generated WebP images match the centered
crop shown in product cards and galleries; the hero uses AVIF with a WebP fallback.
Local Nunito and Poppins files retain their OFL licenses in `public/fonts/`.

To regenerate images on macOS, install WebP and libavif (`brew install webp libavif`),
then run `npm run optimize:images`. This uses the built-in `sips` image utility.
Generated images are committed, so production builds need no image tools.

## Validation

`npm test` checks prerendered routes, metadata, local assets, the footer credit,
and crawler files. Run it after building. `npm audit` checks dependencies.

For performance audits, test the production preview or deployed URL with Lighthouse
on both mobile and desktop. Scores vary with hardware, network, and server response.
