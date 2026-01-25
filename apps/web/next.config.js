/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['common', 'client'],
  reactStrictMode: true,
  output: 'standalone',
}

module.exports = nextConfig
