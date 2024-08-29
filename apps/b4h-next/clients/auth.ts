import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { B4hBaseHeaders } from '../shared/header';
import { B4hMethod } from '../shared/method';
import { B4hApiRoutes } from '../shared/routes';

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';

export const loginFetch = async (token: string) =>
  fetch(new URL(B4hApiRoutes.login, baseUrl), {
    method: 'POST',
    headers: {
      // ...B4hBaseHeaders,
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  });

export const refreshSessionFetch = async (requestUrl: string, session: RequestCookie | undefined) =>
  await fetch(new URL(B4hApiRoutes.login, requestUrl), {
    method: B4hMethod.get,
    headers: {
      ...B4hBaseHeaders,
      Cookie: `session=${session?.value}`
    },
    cache: 'no-cache'
  });

export const logoutFetch = async () =>
  fetch(new URL(B4hApiRoutes.login, baseUrl), {
    headers: B4hBaseHeaders,
    method: B4hMethod.delete,
    cache: 'no-cache'
  });
