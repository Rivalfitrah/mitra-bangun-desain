import React from 'react'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { uploadSignature, deleteSignature } from '@/lib/api'


function CanvasSignature({ userId = 'anonymous' }) {
    const sigCanvas = useRef({});
    const [isUploading, setIsUploading] = useState(false);
    const [savedSignature, setSavedSignature] = useState(null);

    const clear = () => {
      sigCanvas.current.clear();
    };

    const save = async () => {
      if (sigCanvas.current.isEmpty()) {
        alert("Belum ada tanda tangan");
        return;
      }

      const dataURL = sigCanvas.current.toDataURL("image/png");
      console.log("Canvas DataURL:", dataURL.slice(0, 50) + '...');

      setIsUploading(true);
      try {
        const result = await uploadSignature({
          file: dataURL, // data URL PNG
          userId,
          type: 'manual',
        });

        if (result && result.success && result.data) {
          setSavedSignature(result.data);
          sigCanvas.current.clear();
          alert('Tanda tangan berhasil disimpan ke Cloudinary!');
        } else {
          throw new Error('Response upload tidak sesuai');
        }
      } catch (err) {
        console.error('Gagal upload tanda tangan dari canvas:', err);
        alert('Gagal mengunggah tanda tangan: ' + (err.message || 'unknown'));
      } finally {
        setIsUploading(false);
      }
    };

    const handleDelete = async () => {
      if (!savedSignature) return;
      if (!confirm('Yakin ingin menghapus tanda tangan ini?')) return;
      try {
        await deleteSignature(savedSignature.public_id);
        setSavedSignature(null);
        alert('Tanda tangan dihapus dari Cloudinary');
      } catch (err) {
        console.error('Gagal menghapus signature:', err);
        alert('Gagal menghapus tanda tangan: ' + (err.message || 'unknown'));
      }
    };
  return (
    <>
            {/* Canvas tanda tangan */}
        <div className="w-full h-40 border rounded-md bg-gray-50 relative">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            backgroundColor="transparent"
            canvasProps={{
              className: "w-full h-full",
            }}
          />
        </div>

        {/* Preview hasil upload atau tombol aksi */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={save}
            className="px-6 py-2 bg-[#243B83] text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button onClick={clear} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Hapus
          </button>

          {savedSignature && (
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(savedSignature.url);
                  alert('URL tanda tangan disalin ke clipboard');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Copy URL
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Hapus dari Cloud
              </button>
            </>
          )}
        </div>
    
    </>
  )
}

export default CanvasSignature