import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwtToken")?.value || "";
  const { pathname, searchParams } = request.nextUrl;

  // Check if the request is for a public path
  const publicPaths = ["/intro","/join", "/login"];
  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  const privatePaths = ["/", "/profile"];
  if (privatePaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/intro", request.nextUrl));
  }

  // If the request is for the general chat page (/chat) or other protected paths
  // and the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/join", "/login","/profile", "/intro"],
};
