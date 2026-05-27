import { NextResponse } from "next/server";
import { verifyToken } from "./app/lib/jwt";

export function middleware(req) {

  const token =
    req.cookies.get("token")?.value;

  if(!token) {

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const decoded = verifyToken(token);

  if(!decoded) {

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
}