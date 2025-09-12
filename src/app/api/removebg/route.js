import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image_file");

    if (!file) {
      console.error("No file found in FormData");
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      return NextResponse.json({ error: "Tipe file tidak didukung. Gunakan JPEG, PNG, atau WebP" }, { status: 400 });
    }

    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error("File too large:", file.size);
      return NextResponse.json({ error: "Ukuran file terlalu besar. Maksimal 10MB" }, { status: 400 });
    }

    console.log("File validation passed, sending to remove.bg API...");

    const removeBgForm = new FormData();
    removeBgForm.append("image_file", file); // langsung pakai File dari req
    removeBgForm.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      body: removeBgForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Remove.bg error:", errorText);
      return NextResponse.json(
        { error: "Gagal menghapus background", detail: errorText },
        { status: response.status }
      );
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    const base64Image = `data:image/png;base64,${resultBuffer.toString("base64")}`;

    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error("Remove.bg API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
