const HTTPS = 'https://';
export const BASE_URL =
  process.env['VERCEL_ENV'] === 'production'
    ? HTTPS + (process.env['VERCEL_PROJECT_PRODUCTION_URL'] as string) // use production url
    : process.env['VERCEL_ENV'] === 'development'
      ? HTTPS + (process.env['VERCEL_URL'] as string) // use developer url
      : process.env['VERCEL_ENV'] === 'preview'
        ? HTTPS + (process.env['VERCEL_URL'] as string) // use preview url
        : 'http://localhost:3000'; // use local url

console.log('BASE_URL', {
  baseURL: BASE_URL,
  vercelEnv: process.env['VERCEL_ENV'],
  prodUrl: process.env['VERCEL_PROJECT_PRODUCTION_URL'],
  vercelUrl: process.env['VERCEL_URL'],
  branchUrl: process.env['VERCEL_BRANCH_URL']
});
