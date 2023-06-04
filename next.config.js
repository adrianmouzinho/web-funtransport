/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.shopify.com', 'localhost', '192.168.1.125'],
  },
}

module.exports = nextConfig
