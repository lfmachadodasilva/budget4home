import { B4hApiRoutes } from '@/config/routes';

const baseUrl = (process.env['APP_URL'] as string) ?? 'http://localhost:3000';

export const loginClient = async (token: string) => {
  return fetch(new URL(B4hApiRoutes.login, baseUrl), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const logoutClient = async () => {
  return fetch(new URL(B4hApiRoutes.login, baseUrl), {
    method: 'DELETE'
  });
};
