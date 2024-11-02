const HTTPS = 'https://';
export const BASE_URL =
  process.env['VERCEL_ENV'] === 'production'
    ? HTTPS + (process.env['VERCEL_PROJECT_PRODUCTION_URL'] as string) // use production url
    : process.env['VERCEL_ENV'] === 'preview' || process.env['VERCEL_ENV'] === 'development'
      ? HTTPS + (process.env['VERCEL_URL'] as string) // use non production url
      : 'http://localhost:3000'; // use local url

console.log('BASE_URL', BASE_URL);
