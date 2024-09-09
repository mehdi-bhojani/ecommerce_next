// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//     const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//     if (!token && !request.nextUrl.pathname.startsWith('/signin') && !request.nextUrl.pathname.startsWith('/signup')) {
//         return NextResponse.redirect(new URL('/signin', request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: '/admin/',
// };


import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    // Secret used to sign and encrypt tokens
    const secret = process.env.NEXTAUTH_SECRET;

    // Retrieve the token from the request
    const token = await getToken({ req: request, secret });

    // If no token is found, redirect to not found page
    if (!token) {
        return NextResponse.rewrite(new URL('/notfound', request.url));
    }

    // Check the role in the token
    if (token.role === 'admin') {
        return NextResponse.next(); // Allow the request to proceed
    } else {
        return NextResponse.rewrite(new URL('/notfound', request.url)); // Redirect to not found page
    }
}

export const config = {
    matcher: ['/admin/:path*'], // Apply middleware to routes that need admin access
};
