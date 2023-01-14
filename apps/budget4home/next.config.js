module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    appDir: true
  },
  transpilePackages: ['ui-components']
};
