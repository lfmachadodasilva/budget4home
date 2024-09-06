import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // retrieve the current response
  const response = NextResponse.next();

  // add the CORS headers to the response
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'development' ? '*' : 'https://budget4home.vercel.app'
  );
  response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  response.headers.append(
    'Access-Control-Allow-Headers',
    'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Authorization'
  );

  return response;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/api/:path*'
};
