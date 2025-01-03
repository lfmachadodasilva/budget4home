import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'budget4home',
    name: 'budget4home',
    description: 'budget4home - Project to control my personal budget',
    icons: [
      {
        src: 'favicon.ico',
        type: 'image/x-icon',
        sizes: '64x64'
      },
      {
        src: 'logo16.png',
        type: 'image/png',
        sizes: '16x16'
      },
      {
        src: 'logo24.png',
        type: 'image/png',
        sizes: '24x24'
      },
      {
        src: 'logo32.png',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        src: 'logo64.png',
        type: 'image/png',
        sizes: '64x64'
      },
      {
        src: 'logo213.png',
        type: 'image/png',
        sizes: '213x213'
      }
    ],
    orientation: 'portrait-primary',
    start_url: '/',
    scope: '/',
    display_override: ['standalone'],
    display: 'standalone',
    theme_color: '#6b21a8',
    background_color: '#6b21a8'
  };
}
