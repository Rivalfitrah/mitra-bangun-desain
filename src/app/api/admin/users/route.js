// src/app/api/admin/users/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("Decoded payload:", payload);

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      where: { status: "pending" },
      select: {
        id: true,
        email: true,
        status: true,
        createdAt: true,
        profil: {
          select: {
            nama: true,
            role: true,
            alamat: true,
            phone: true,
            imageUrl: true,
          },
        },
      },
    });

    console.log("Users fetched:", users);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetch users:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
