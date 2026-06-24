import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") return NextResponse.next();
  const token = request.cookies.get("gpiw_admin")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me"));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
