module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    appDir: true
  },
  swcMinify: true,
  transpilePackages: ['ui-components'],
  images: {
    domains: ['firebasestorage.googleapis.com', 'github.com', 'budget4home.vercel.app', 'localhost']
  }
};
