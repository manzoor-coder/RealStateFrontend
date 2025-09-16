import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/sell-rent"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If user is accessing protected route
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // No token → redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // Token exists → proceed
    return NextResponse.next();
  }

  // If user is on login/register but already logged in
  if ((request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/register")) && token) {
    // Redirect to appropriate dashboard (assume default; enhance with role check if needed)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
