/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'cdn.shopify.com',
      'm.media-amazon.com',
      'drive.google.com',
      'static.netshoes.com.br',
      'decathlonpro.vteximg.com.br',
      'www.micro-mobility.com',
      'localhost',
      '192.168.1.125',
    ],
  },
}

module.exports = nextConfig
