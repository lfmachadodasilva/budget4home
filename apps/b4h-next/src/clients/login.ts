import { BASE_URL } from '@/utils/config';

export const loginClient = async (token: string, baseUrl: string = BASE_URL) =>
  fetch(new URL('/api/auth/login', baseUrl), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  });

export const logoutClient = async (baseUrl: string = BASE_URL) =>
  fetch(new URL('/api/auth/login', baseUrl), {
    method: 'DELETE',
    cache: 'no-cache'
  });
