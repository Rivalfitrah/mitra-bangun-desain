import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { image } from "framer-motion/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profil: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 401 });
    }

    // Cek password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    
    // PERUBAHAN UTAMA: Cek status pengguna sebelum mengizinkan login
    if (user.status !== "active") {
        return NextResponse.json({ error: "Akun Anda belum disetujui oleh admin." }, { status: 403 });
    }

    const payload = {
      sub: user.id,
      role: user.profil?.role || "user",
      status: user.status,
      nama: user.profil?.nama || null,
      email: user.email,
      image: user.profil?.imageUrl || null,
      hasProfile: !!user.profil, // true kalau profil sudah ada
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    const response = NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.profil?.nama,
        email: user.email,
        role: user.profil?.role || "user",
        status: user.status,
        profil: user.profil,
      },
      debug: {
        tokenGenerated: !!token,
        tokenLength: token.length
      }
    });

    // ➡️ Metode alternatif: set cookie langsung di response headers
    const cookieString = `token=${token}; Max-Age=${2 * 60 * 60}; Path=/; SameSite=lax; HttpOnly`;
    response.headers.set('Set-Cookie', cookieString);

    // Debug: tambahkan header untuk memastikan cookie diset
    response.headers.set('Set-Cookie-Debug', `token=${token.substring(0, 20)}...; Max-Age=${2 * 60 * 60}; Path=/; SameSite=lax`);

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
