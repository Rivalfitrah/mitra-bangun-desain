// src/app/api/admin/users/[id]/rejected/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { status: "rejected" },
    });

    return NextResponse.json({ message: "User rejected", user });
  } catch (error) {
    console.error("Error reject user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
