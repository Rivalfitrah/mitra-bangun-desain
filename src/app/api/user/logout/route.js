import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // ✅
  
  // Hapus cookie token
  cookieStore.set("token", "", { maxAge: -1, path: "/" });

  return NextResponse.json({ message: "Logout berhasil" });
}
