'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import { removeBackground, uploadSignature, deleteSignature } from '@/lib/api'; // fungsi untuk remove.bg dan upload ke Cloudinary
import { getSignature } from '@/lib/api'
import Swal from 'sweetalert2';


function UploadSignature({ userId = 'anonymous' }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // hasil remove.bg (data URL)
  const [loading, setLoading] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null); // hasil upload (url, public_id, ...)

  // Load saved signature on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await getSignature();
        if (!mounted) return;
        if (res && res.success && res.data) {
          setSavedSignature(res.data);
          if (res.data.uploadUrl) {
            setPreview(res.data.uploadUrl);
          }
        }
      } catch (err) {
        console.error('Gagal load signature:', err);
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  const handleDeleteFromCloud = async () => {
    if (!savedSignature) return;
    if (!confirm('Yakin ingin menghapus tanda tangan ini dari Cloud?')) return;
    try {
      const res = await deleteSignature('upload');
      if (res && res.success) {
        setSavedSignature(null);
        setPreview(null);
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
      console.error('Gagal menghapus tanda tangan:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal menghapus tanda tangan: ' + (err.message || 'unknown'),
        confirmButtonText: 'OK'
      });
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validasi tipe file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Hanya file gambar (JPEG, PNG, WebP) yang diizinkan!',
          confirmButtonText: 'OK'
        });
        e.target.value = "";
        return;
      }

      // Validasi ukuran file (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Ukuran file terlalu besar. Maksimal 10MB.',
          confirmButtonText: 'OK'
        });
        e.target.value = "";
        return;
      }

      console.log(
        "File selected:",
        selectedFile.name,
        selectedFile.type,
        selectedFile.size
      );
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      // beri umpan balik ke pengguna jika belum memilih file
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih file terlebih dahulu sebelum menekan Upload',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      console.log("Starting remove-bg for file:", file.name, file.type, file.size);
      const result = await removeBackground(file);

      // misal API mengembalikan base64 png sebagai result.image
      if (result.image) {
        setPreview(result.image); // result.image sudah dalam format data:image/png;base64,xxx
      } else if (result.dataUrl) {
        // fallback jika property bernama berbeda
        setPreview(result.dataUrl);
      }
    } catch (err) {
      console.error("Upload gagal:", err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal', 
        text: 'Gagal menghapus background: ' + (err.message || 'unknown'),
        confirmButtonText: 'OK'
      });
    }
  };

const handleSave = async () => {
    // pilih payload: preview (dataURL) jika ada, atau file (File)
    const payload = preview || file;
    if (!payload) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih tanda tangan dulu sebelum menyimpan',
        confirmButtonText: 'OK'
      });
      return;
    }

    setLoading(true);
    try {
      // tentukan type folder berdasarkan payload
      const isDataUrl = typeof payload === 'string' && payload.startsWith('data:image/');
      const type = isDataUrl ? 'upload' : 'upload'; // untuk saat ini gunakan folder 'upload'

      const result = await uploadSignature({
        file: payload,
        userId,
        type,
      });

      console.log("Upload berhasil:", result);
      if (result && result.success && result.data) {
        // server mengembalikan object { success: true, data: { url, public_id, ... } }
        setSavedSignature(result.data);
        // reset local preview/file
        setPreview(null);
        setFile(null);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Tanda tangan berhasil disimpan!',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error('Response upload tidak sesuai');
      }
    } catch (err) {
      console.error("Upload gagal:", err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal', 
        text: 'Gagal menghapus background: ' + (err.message || 'unknown'),
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     {/* Preview tanda tangan */}
        <div className="flex flex-col items-start mb-4">
          <div className="w-48 h-24 border border-gray-600 rounded-md flex items-center justify-center overflow-hidden bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="Tanda Tangan"
                className="object-contain"
              />
            ) : (
              <span className="text-gray-400 text-sm">
                Belum ada tanda tangan
              </span>
            )}
          </div>
          {preview && (
            <button
              className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              onClick={async () => {
                // jika preview sama dengan savedSignature.uploadUrl maka hapus dari cloud/db
                if (savedSignature && savedSignature.uploadUrl && preview === savedSignature.uploadUrl) {
                  await handleDeleteFromCloud();
                } else {
                  setPreview(null);
                }
              }}
            >
              Hapus
            </button>
          )}
        </div>

        <hr className="my-4" />

        {/* Upload tanda tangan */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#243B83] mb-2">
            Upload tanda tangan
          </label>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-700 rounded-md px-2 py-1 cursor-pointer file:mr-3 file:py-1 file:px-4 file:rounded-md file:border file:border-gray-600 file:text-sm file:font-medium file:bg-transparent file:text-gray-600 ${savedSignature && savedSignature.uploadUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={Boolean(savedSignature && savedSignature.uploadUrl)}
          />
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              className={`mt-3 w-32 py-2 bg-[#243B83] text-white font-semibold rounded-lg hover:bg-blue-700 transition ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!file || loading || Boolean(savedSignature && savedSignature.uploadUrl)}
            >
              {loading ? 'Processing...' : 'Upload'}
            </button>
            <button
              onClick={handleSave}
              className={`mt-3 w-32 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition ${(!file && !preview) || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={((!file && !preview) || loading || Boolean(savedSignature && savedSignature.uploadUrl))}
            >
                {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
        {/* existing 'Hapus' button above will handle deletion for saved uploads */}
    
    </>
  )
}

export default UploadSignature