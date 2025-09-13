import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
  include: {
    uploader: {
      select: {
        id: true,
        email: true,
        profil: {
          select: {
            nama: true,
            role: true,
            imageUrl: true,
          },
        },
      },
    },
    signers: {
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profil: {
              select: {
                nama: true,
                role: true,
                imageUrl: true,
              },
            },
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
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
