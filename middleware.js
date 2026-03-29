import { NextResponse } from 'next/server';

// 1. Ye function export hona zaroori hai (Yahi error aa raha tha)
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Abhi ke liye sirf request ko aage bhej rahe hain (Pass-through)
  // Baad mein yaha Admin session check logic daalenge
  return NextResponse.next();
}

// 2. Matcher defines ki ye middleware kin pages pe chalega
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};