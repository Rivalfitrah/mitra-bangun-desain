import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: { status: "active" },
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

        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetch active users:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
