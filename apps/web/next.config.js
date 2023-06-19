/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@budget4home/design-tokens',
    '@budget4home/firebase',
    '@budget4home/firestore',
    '@budget4home/web-components'
  ],
  experimental: {}
};

module.exports = nextConfig;
