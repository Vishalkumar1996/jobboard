// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
 console.log("Token", token, url)
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Role-based route protection
    if (
      url.pathname.startsWith("/dashboard/employer") &&
      decoded.userType !== "employer"
    ) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (
      url.pathname.startsWith("/dashboard/candidate") &&
      decoded.userType !== "candidate"
    ) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/admin") && !decoded.isAdmin) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token", err.message);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/dashboard/employer",
    "/dashboard/employer/:path*",
    "/dashboard/candidate",
    "/dashboard/candidate/:path*",
    "/admin",
    "/admin/:path*",
  ],
};

