import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const formData = await request.formData();
    const file = formData.get("signature");
    // Normalize type: allow only 'manual' or 'upload'
    let type = String(formData.get("type") || "manual");
    if (!['manual', 'upload'].includes(type)) {
      console.warn('Received unexpected type for signature upload:', type, 'defaulting to manual');
      type = 'manual';
    }

    if (!file) {
      return NextResponse.json(
        { error: 'File tanda tangan tidak ditemukan' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    let buffer;
    if (typeof file === 'string' && file.startsWith('data:image/')) {
      // Untuk data URL (dari canvas)
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
    } else {
      // Untuk file upload
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `signature_${userId || 'anonymous'}_${timestamp}`;
    
    // Upload ke Cloudinary dengan folder structure
    const uploadResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${buffer.toString('base64')}`,
      {
        folder: `mitra-bangun-desain/signatures/${type}`,
        public_id: filename,
        resource_type: 'image',
        format: 'png',
        quality: 'auto:good',
        transformation: [
          {
            width: 800,
            height: 400,
            crop: 'fit',
            background: 'transparent'
          }
        ]
      }
    );

    // Simpan atau update ke DB sesuai schema (manualUrl / uploadUrl)
    const signature = await prisma.signature.upsert({
      where: { userId },
      update:
        type === 'manual'
          ? { manualUrl: uploadResult.secure_url }
          : { uploadUrl: uploadResult.secure_url },
      create: {
        userId,
        manualUrl: type === 'manual' ? uploadResult.secure_url : null,
        uploadUrl: type === 'upload' ? uploadResult.secure_url : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: signature,
      cloudinary: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        bytes: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
      },
    });


  } catch (error) {
    console.error('Error uploading signature to Cloudinary:', error);
    return NextResponse.json(
      { 
        error: 'Gagal mengunggah tanda tangan',
        details: error.message 
      },
      { status: 500 }
    );
  }
}














// Optional: DELETE endpoint untuk menghapus tanda tangan
export async function DELETE(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const { searchParams } = new URL(request.url);
    const type = String(searchParams.get('type') || 'manual');
    if (!['manual', 'upload'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Ambil signature dari DB
    const signature = await prisma.signature.findUnique({ where: { userId } });
    if (!signature) {
      return NextResponse.json({ error: 'Signature not found' }, { status: 404 });
    }

    const urlToDelete = type === 'manual' ? signature.manualUrl : signature.uploadUrl;
    if (!urlToDelete) {
      return NextResponse.json({ error: 'No URL to delete for this type' }, { status: 404 });
    }

    // Extract public_id from Cloudinary URL
    const extractPublicId = (url) => {
      try {
        const u = new URL(url);
        let path = u.pathname || '';
        // find last occurrence of /v{number}/ and take substring after it
        const vMatch = path.match(/\/v(\d+)\//g);
        if (vMatch && vMatch.length > 0) {
          // find last index of /v{num}/
          const lastV = path.lastIndexOf(vMatch[vMatch.length - 1]);
          path = path.substring(lastV + vMatch[vMatch.length - 1].length);
        } else {
          // fallback: remove leading /image/upload/ if present
          path = path.replace(/^\/image\/upload\//, '');
        }
        // remove file extension
        path = path.replace(/\.[^/.]+$/, '');
        // trim leading slash
        path = path.replace(/^\//, '');
        return path;
      } catch (err) {
        return null;
      }
    };

    const publicId = extractPublicId(urlToDelete);
    if (!publicId) {
      console.error('Failed to extract public id for url:', urlToDelete);
      return NextResponse.json({ error: 'Failed to extract public id' }, { status: 500 });
    }

    // Hapus dari Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    const cloudResult = result?.result;

    // Only update DB if Cloudinary deletion succeeded or resource not found
    if (cloudResult === 'ok' || cloudResult === 'not found') {
      const updated = await prisma.signature.update({
        where: { userId },
        data: type === 'manual' ? { manualUrl: null } : { uploadUrl: null },
      });

      return NextResponse.json({ success: true, result: cloudResult, data: updated });
    }

    // Deletion failed on Cloudinary; do not update DB
    console.error('Cloudinary destroy failed for publicId:', publicId, 'result:', cloudResult);
    return NextResponse.json({ error: 'Failed to delete resource from Cloudinary', details: cloudResult }, { status: 500 });

  } catch (error) {
    console.error('Error deleting signature from Cloudinary:', error);
    return NextResponse.json(
      { 
        error: 'Gagal menghapus tanda tangan',
        details: error.message 
      },
      { status: 500 }
    );
  }
}