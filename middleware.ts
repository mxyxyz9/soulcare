import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      // Add fallback for missing secret
      secureCookie: process.env.NODE_ENV === "production",
    })

    // Define protected routes
    const protectedPaths = ["/dashboard", "/profile", "/settings"]

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

    // If it's a protected route and user is not authenticated, redirect to login
    if (isProtectedPath && !token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // If user is already authenticated and tries to access login/register, redirect to dashboard
    if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Continue without authentication check if there's an error
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/login", "/register"],
}
