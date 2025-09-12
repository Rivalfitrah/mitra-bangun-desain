import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('signature');
    const userId = formData.get('userId');
    const type = formData.get('type') || 'manual'; // 'manual' untuk canvas, 'upload' untuk file upload

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
        folder: `/signatures/${type}`,
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

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        folder: uploadResult.folder,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes
      }
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
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID tidak ditemukan' },
        { status: 400 }
      );
    }

    // Hapus dari Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: true,
      result: result.result
    });

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