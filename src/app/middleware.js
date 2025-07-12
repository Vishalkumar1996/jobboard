import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const url = new URL(req.url);

    if (
      url.pathname.startsWith("/dashboard/candidate") &&
      decoded.userType !== "candidate"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      url.pathname.startsWith("/dashboard/employer") &&
      decoded.userType !== "employer"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (url.pathname.startsWith("/admin") && !decoded.isAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
