import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // ambil user id dari token di cookie
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    let userId = null;
    try {
      const decoded = jwt.decode(token);
      userId = decoded?.sub ? Number(decoded.sub) : null;
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found in token" },
        { status: 400 }
      );
    }

    // ambil dokumen yang diunggah oleh user saat ini
    const documents = await prisma.document.findMany({
      where: {
        uploaderId: userId,
      },
      include: {
        uploader: {
          select: {
            id: true,
            email: true,
            profil: true,
          },
        },
        signers: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profil: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching assigned documents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assigned documents" },
      { status: 500 }
    );
  }
}
