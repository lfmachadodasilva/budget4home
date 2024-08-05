import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { refreshSessionFetch } from './clients/auth';
import { B4hRoutes } from './config/routes';

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session');

  // return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL(B4hRoutes.login, request.url));
  }

  try {
    const responseAPI = await refreshSessionFetch(request.url, session);

    // return to /login if token is not authorized
    if (responseAPI.status !== 200) {
      return NextResponse.redirect(new URL(B4hRoutes.login, request.url));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL(B4hRoutes.login, request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ['/(groups|labels|expenses)/:path*']
};
