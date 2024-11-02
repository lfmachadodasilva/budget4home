export const BASE_URL = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';

console.log('BASE_URL', {
  baseURL: BASE_URL,
  vercelEnv: process.env['VERCEL_ENV'] as string,
  prodUrl: process.env['VERCEL_PROJECT_PRODUCTION_URL'] as string,
  vercelUrl: process.env['VERCEL_URL'] as string,
  branchUrl: process.env['VERCEL_BRANCH_URL'] as string
});
