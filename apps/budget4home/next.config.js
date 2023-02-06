const imagesDomains = ['firebasestorage.googleapis.com', 'github.com', 'budget4home.vercel.app'];
if (process.env.NODE_ENV === 'development') {
  imagesDomains.push('localhost');
}

module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    appDir: true
  },
  swcMinify: true,
  transpilePackages: ['ui-components'],
  images: {
    domains: imagesDomains
  }
};
