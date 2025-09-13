'use client';
import React from 'react'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { uploadSignature, deleteSignature, getSignature } from '@/lib/api'
import { useEffect } from 'react'
import Swal from 'sweetalert2';


function CanvasSignature({ userId = 'anonymous' }) {
    const sigCanvas = useRef({});
    const [isUploading, setIsUploading] = useState(false);
    const [savedSignature, setSavedSignature] = useState(null);


    const clear = () => {
      sigCanvas.current.clear();
    };

    // Load saved signature on mount
    useEffect(() => {
      let mounted = true;
      async function load() {
        try {
          const res = await getSignature();
          if (!mounted) return;
          if (res && res.success && res.data) {
            // Only treat as savedSignature for canvas when manualUrl exists
            if (res.data.manualUrl) {
              setSavedSignature(res.data);
              if (sigCanvas.current && typeof sigCanvas.current.fromDataURL === 'function') {
                sigCanvas.current.fromDataURL(res.data.manualUrl);
              }
            } else {
              // no manual signature: ensure canvas is empty and savedSignature cleared
              setSavedSignature(null);
              if (sigCanvas.current && typeof sigCanvas.current.clear === 'function') {
                sigCanvas.current.clear();
              }
            }
          }
        } catch (err) {
          console.error('Gagal load signature:', err);
        }
      }
      load();
      return () => { mounted = false };
    }, []);

    const save = async () => {
      if (sigCanvas.current.isEmpty()) {
        Swal.fire({
          icon: 'warning',
          title: 'Belum ada tanda tangan',
          text: 'Silakan buat tanda tangan terlebih dahulu',
          confirmButtonText: 'OK'
        });
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
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Tanda tangan berhasil disimpan',
            confirmButtonText: 'OK'
          });
        } else {
          throw new Error('Response upload tidak sesuai');
        }
      } catch (err) {
        console.error('Gagal upload tanda tangan dari canvas:', err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengunggah tanda tangan: ' + (err.message || 'unknown'),
          confirmButtonText: 'OK'
        });
      } finally {
        setIsUploading(false);
      }
    };

    const handleDelete = async () => {
      if (!savedSignature) return;
      if (!confirm('Yakin ingin menghapus tanda tangan ini?')) return;
      try {
        const res = await deleteSignature('manual');
        if (res && res.success) {
          setSavedSignature(null);
          // clear canvas
          if (sigCanvas.current && typeof sigCanvas.current.clear === 'function') sigCanvas.current.clear();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Tanda tangan berhasil dihapus',
            confirmButtonText: 'OK'
          });
        } else {
          throw new Error('Delete failed');
        }
      } catch (err) {
        console.error('Gagal menghapus signature:', err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal menghapus tanda tangan: ' + (err.message || 'unknown'),
          confirmButtonText: 'OK'
        });
      }
    };

    return (
      <>
        <div className="w-full h-40 border rounded-md bg-gray-50 relative">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            backgroundColor="transparent"
            canvasProps={{
              className: "w-full h-full",
            }}
          />
          {/* overlay to prevent drawing when manual signature exists */}
          {savedSignature && savedSignature.manualUrl && (
            <div className="absolute inset-0 bg-transparent" style={{ pointerEvents: 'auto' }} />
          )}
        </div>

        {/* Preview hasil upload atau tombol aksi */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={save}
            className={`px-6 py-2 bg-[#243B83] text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 ${isUploading || (sigCanvas.current?.isEmpty && sigCanvas.current.isEmpty()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUploading || (sigCanvas.current?.isEmpty && sigCanvas.current.isEmpty())}
          >
            {isUploading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button onClick={clear} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Hapus
          </button>

          {savedSignature && savedSignature.manualUrl && (
            <>
              <a href={savedSignature.manualUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">Lihat tanda tangan</a>
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
    );
}

export default CanvasSignature