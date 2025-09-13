import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = Number(decoded.sub);
    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
    }

    const signature = await prisma.signature.findUnique({
      where: { userId },
    });

    return NextResponse.json({ success: true, data: signature });
  } catch (error) {
    console.error('Error fetching signature:', error);
    return NextResponse.json({ error: 'Gagal mengambil signature', details: error.message }, { status: 500 });
  }
}
