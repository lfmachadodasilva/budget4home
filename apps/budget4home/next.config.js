module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    appDir: true
  },
  swcMinify: true,
  transpilePackages: ['ui-components']
};
