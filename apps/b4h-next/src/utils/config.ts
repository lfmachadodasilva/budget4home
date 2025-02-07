function ensureHttps(url: string): string {
  const https = 'https://';
  return url.startsWith(https) ? url : https + url;
}
export const BASE_URL = ensureHttps(
  process.env['VERCEL_ENV'] === 'production'
    ? (process.env['VERCEL_PROJECT_PRODUCTION_URL'] as string) // use production url
    : process.env['VERCEL_ENV'] === 'development'
      ? (process.env['NEXT_PUBLIC_API_URL'] as string) // use developer url
      : process.env['VERCEL_ENV'] === 'preview'
        ? (process.env['NEXT_PUBLIC_API_URL'] as string) // use preview url
        : 'http://localhost:3000' // use local url
);

console.log('BASE_URL', {
  BASE_URL,
  vercelEnv: process.env['VERCEL_ENV'],
  vercelProdUrl: process.env['VERCEL_PROJECT_PRODUCTION_URL'],
  nextPublicApiUrl: process.env['NEXT_PUBLIC_API_URL'],
  commitSha: process.env['VERCEL_GIT_COMMIT_SHA']
});
