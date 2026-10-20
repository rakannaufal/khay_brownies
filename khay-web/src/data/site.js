import { products } from './products'

export const SITE_URL = 'https://khay-brownies.vercel.app'

export function getPageMetadata(path) {
  path = path.replace(/\/+$/, '') || '/'
  const product = products.find(item => path === `/product/${item.slug}`)
  return {
    title: product ? `${product.name.trim()} | Khay Brownies` : 'Khay Brownies | Brownies Homemade Terlezat',
    description: product?.description || 'Khay Brownies - Brownies homemade lezat dengan berbagai varian. Pesan sekarang via WhatsApp!',
    url: `${SITE_URL}${product ? `/product/${product.slug}` : '/'}`,
    image: `${SITE_URL}${product ? product.images[0] : '/images/hero-760.webp'}`,
  }
}
