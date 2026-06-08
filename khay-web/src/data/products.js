export const products = [
  {
    id: 1,
    name: 'Brownis Mini Size',
    slug: 'brownis-mini-size',
    tagline: 'Mungil & Menggoda',
    description: 'Brownies ukuran mini yang pas untuk camilan sehari-hari. Tekstur fudgy yang lembut dan rasa cokelat yang intens, dikemas rapi dalam cup mini. Cocok untuk hadiah atau hampers!',
    price: 8000,
    images: ['/images/brownis/brownis_mini_size.jpeg'],
    category: 'mini',
    badge: 'Best Seller',
    features: ['Ukuran mini pas di tangan', 'Tekstur fudgy', 'Cocok untuk hampers'],
    toppings: []
  },
  {
    id: 2,
    name: 'Brownis Cup Mini',
    slug: 'brownis-cup-mini',
    tagline: 'Cup Kecil, Rasa Besar',
    description: 'Brownies dalam cup mini yang praktis dan mudah dinikmati. Potongan brownies fudgy dengan topping beragam dalam cup kraft yang estetik. Pas untuk acara atau snacking!',
    price: 20000,
    images: ['/images/brownis/brownis_cup_mini.jpeg', '/images/brownis/brownis_cup_mini_2.jpeg'],
    category: 'cup',
    badge: 'Favorit',
    features: ['Dalam cup kraft estetik', 'Praktis dibawa', 'Cocok untuk acara'],
    toppings: ['Keju', 'Chocochips', 'Oreo']
  },
  {
    id: 3,
    name: 'Cheesecuit ',
    slug: 'cheesecuit',
    tagline: 'Perpaduan Keju & Cokelat',
    description: 'Brownies special dengan topping cheesecuit yang creamy dan lumer. Perpaduan sempurna antara brownies fudgy dengan lapisan keju biskuit yang gurih manis. Wajib coba!',
    price: 28000,
    images: ['/images/brownis/brownis_Cheesecuit.jpeg'],
    category: 'special',
    badge: 'New',
    features: ['Topping cheesecuit premium', 'Rasa gurih-manis', 'Tekstur creamy'],
    toppings: []
  },
  {
    id: 4,
    name: 'Brownis Box M',
    slug: 'brownis-box-m',
    tagline: 'Pas untuk Berbagi',
    description: 'Brownies dalam box ukuran medium berisi campuran varian topping. Pilihan tepat untuk acara kumpul keluarga, arisan, atau oleh-oleh. Isi box beragam topping yang menggugah selera!',
    price: 45000,
    images: ['/images/brownis/brownis_box_m.jpeg'],
    category: 'box',
    badge: 'Hemat',
    features: ['Box medium isi beragam', 'Cocok untuk berbagi', 'Mix topping'],
    toppings: []
  },
  {
    id: 5,
    name: 'Brownis Box L',
    slug: 'brownis-box-l',
    tagline: 'Jumbo untuk Semua!',
    description: 'Brownies box ukuran besar yang cocok untuk acara besar, hajatan, or hampers premium. Berisi brownies dengan berbagai varian topping yang tertata cantik dalam box premium.',
    price: 85000,
    images: ['/images/brownis/brownis_box_l.jpeg', '/images/brownis/brownis_box_l_2.jpeg'],
    category: 'box',
    badge: 'Premium',
    features: ['Box besar isi banyak', 'Packaging premium', 'Cocok untuk hajatan'],
    toppings: []
  }
]

export const reviews = [
  { id: 1, image: '/images/review/review1.jpeg' },
  { id: 2, image: '/images/review/review2.jpeg' },
  { id: 3, image: '/images/review/review3.jpeg' },
  { id: 4, image: '/images/review/review4.jpeg' },
  { id: 5, image: '/images/review/review5.jpeg' },
  { id: 6, image: '/images/review/review6.jpeg' },
  { id: 7, image: '/images/review/review7.jpeg' },
  { id: 8, image: '/images/review/review8.jpeg' },
  { id: 9, image: '/images/review/review9.jpeg' },
  { id: 10, image: '/images/review/review10.jpeg' },
  { id: 11, image: '/images/review/review11.jpeg' }
]

export const WHATSAPP_NUMBER = '6288271128082'

export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export function generateWhatsAppLink(productName, quantity, topping, notes) {
  const message = encodeURIComponent(
    `Halo Khay Brownies!\n\n` +
    `Saya ingin memesan:\n` +
    `Produk: *${productName}*\n` +
    `Jumlah: ${quantity}\n` +
    (topping ? `Topping: ${topping}\n` : '') +
    (notes ? `Catatan: ${notes}\n` : '') +
    `\nMohon info selanjutnya ya, terima kasih!`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}
