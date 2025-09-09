import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

// Helper upload
async function uploadToCloudinary(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "profiles" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const userId = formData.get("userId");
    const nama = formData.get("nama");
    const alamat = formData.get("alamat");
    const phone = formData.get("phone");
    const role = formData.get("role");
    const imageFile = formData.get("image");

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadToCloudinary(imageFile);
      imageUrl = uploadRes.secure_url;
    }

    const profil = await prisma.profil.upsert({
      where: { userId: Number(userId) },
      update: {
        nama,
        alamat,
        phone,
        role,
        ...(imageUrl && { imageUrl }),
      },
      create: {
        userId: Number(userId),
        nama,
        alamat,
        phone,
        role,
        imageUrl: imageUrl || "",
      },
    });

    return NextResponse.json({ message: "Profil berhasil disimpan", profil });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan profil" },
      { status: 500 }
    );
  }
}
