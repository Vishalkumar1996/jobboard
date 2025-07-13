import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const [key, ...rest] = pair.trim().split("=");
    cookies[key] = rest.join("=");
  }
  return cookies;
}

export const verifyToken = (req) => {
  // For Next.js app router API routes, req is Request
  // Extract token from cookie header
  const cookieHeader = req.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies["token"];

  if (!token) throw new Error("No token provided");

  return jwt.verify(token, JWT_SECRET);
};
