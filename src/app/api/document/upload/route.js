import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // Try to get user id from cookie token (optional). If not present, uploads are still allowed
    const token = (await cookies()).get("token")?.value;
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.decode(token);
        // assume sub is user id (as number or string)
        userId = decoded?.sub ? Number(decoded.sub) : null;
      } catch (e) {
        console.warn("Failed to decode token in document upload route");
      }
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title") || null;
    const customId = formData.get("customId") || null;
    const signersRaw = formData.get("signers");
    const docType = (formData.get("docType") || "general");
    let signers = [];

    if (signersRaw) {
      try {
        signers = JSON.parse(signersRaw); // array of { id: number }
      } catch (e) {
        console.warn("Failed to parse signers:", e);
      }
    }

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert to buffer
    let buffer;
    if (typeof file === "string" && file.startsWith("data:")) {
      const base64Data = file.replace(/^data:\w+\/[a-zA-Z+]+;base64,/, "");
      buffer = Buffer.from(base64Data, "base64");
    } else {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    const timestamp = Date.now();
    const filename = `document_${timestamp}`;

    const uploadResult = await cloudinary.uploader.upload(
      `data:application/octet-stream;base64,${buffer.toString("base64")}`,
      {
        folder: `mitra-bangun-desain/documents`,
        public_id: filename,
        resource_type: "auto",
        quality: "auto:good",
      }
    );

    // Persist to database: Document requires title, type, content, customId
    // We'll store the secure_url in content and set type to the file's format
    const doc = await prisma.document.create({
      data: {
        title: title || `Document ${timestamp}`,
        type: uploadResult.format || "unknown",
        docType: (docType),
        content: uploadResult.secure_url,
        customId: customId || `${uploadResult.public_id}_${timestamp}`,
        uploaderId: userId || null,
      },
    });

    // If we have a userId, create an initial DocumentSigner linking the uploader as a signer (pending)
    try {
      if (signers.length > 0) {
        await prisma.documentSigner.createMany({
          data: signers.map((signer) => ({
            documentId: doc.id,
            userId: Number(signer.id),
            status: "pending",
          })),
        });
      }

      // NOTE: do NOT auto-add the uploader as a signer. Only create signers that
      // were explicitly provided in the `signers` form field.
    } catch (e) {
      console.warn("Failed to create DocumentSigner:", e.message || e);
    }

    return NextResponse.json({
      success: true,
      data: {
        document: doc,
        cloud: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
          bytes: uploadResult.bytes,
          format: uploadResult.format,
          docType: (docType),
        },
      },
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document", details: error.message },
      { status: 500 }
    );
  }
}
