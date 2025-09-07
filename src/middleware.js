// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  console.log("All cookies:", req.cookies.getAll());
  
  // Ambil token dari cookie
  const token = req.cookies.get("token")?.value;
  console.log("Token found:", !!token);
  console.log("Token value:", token ? `${token.substring(0, 20)}...` : "null");

  // Kalau nggak ada token → redirect ke login
  if (!token) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded;
  try {
    // Menggunakan jose untuk Edge Runtime compatibility
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Gunakan jwtVerify yang proper dari jose
    const { payload } = await jwtVerify(token, secret);
    decoded = payload;
    console.log("Token decoded successfully:", decoded);
  } catch (err) {
    console.log("Token verification failed:", err.message);
    // Token invalid atau expired → redirect ke login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Kalau status pending → redirect ke halaman waiting
  if (decoded.status === "pending") {
    console.log("User status is pending, redirecting to waiting");
    return NextResponse.redirect(new URL("/waiting", req.url));
  }

  // Kalau profil belum lengkap → redirect ke halaman register profil
  if (decoded.status === "active" && !decoded.hasProfile) {
    console.log(
      "User is active but has no profile, redirecting to register/profil"
    );
    return NextResponse.redirect(new URL("/register/profil", req.url));
  }

  console.log("All checks passed, allowing access to dashboard");

  // Kalau semua oke → lanjut akses dashboard
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard", // Tambahkan path root
    "/dashboard/:path*", // Tambahkan semua subpath
  ],
};
