export const BASE_URL = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';

console.log('BASE_URL', {
  baseURL: BASE_URL,
  vercelEnv: process.env['VERCEL_ENV'],
  prodUrl: process.env['VERCEL_PROJECT_PRODUCTION_URL'],
  vercelUrl: process.env['VERCEL_URL'],
  branchUrl: process.env['VERCEL_BRANCH_URL']
});
