import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, confirmPassword } = body;

    // Validasi input
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Email, password, dan konfirmasi password wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        // status & metode otomatis default dari schema
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          status: newUser.status,
          metode: newUser.metode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
