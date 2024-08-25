//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const imagesDomains = [
  'firebasestorage.googleapis.com',
  'github.com',
  'budget4home.vercel.app',
  'b4h.vercel.app'
];
if (process.env.NODE_ENV === 'development') {
  imagesDomains.push('localhost');
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  distDir: '../../dist/apps/b4h-next/.next',
  output: 'standalone',
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  images: {
    domains: imagesDomains
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx
];

module.exports = composePlugins(...plugins)(nextConfig);
