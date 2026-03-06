import {NextRequest, NextResponse} from 'next/server';
import {getToken, GetTokenParams} from '@auth/core/jwt';

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  let params: GetTokenParams = {
    req: request,
    secret: process.env.AUTH_SECRET ?? "secret"
  };

  const token = await getToken(params);
  const protectedRoutes = ['/ingredients'];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/error', request.url);
      url.searchParams.set('message', 'Недостаточно прав');
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/ingredients']
};