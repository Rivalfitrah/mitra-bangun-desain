import React from 'react'
import { useState } from 'react'
import { removeBackground, uploadSignature } from '@/lib/api'; // fungsi untuk remove.bg dan upload ke Cloudinary


function UploadSignature({ userId = 'anonymous' }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // hasil remove.bg (data URL)
  const [loading, setLoading] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null); // hasil upload (url, public_id, ...)

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
        alert("Hanya file gambar (JPEG, PNG, WebP) yang diizinkan!");
        e.target.value = "";
        return;
      }

      // Validasi ukuran file (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Ukuran file maksimal 10MB!");
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
      console.error("No file selected");
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
      alert(
        "Gagal menghapus background: " +
          (err.response?.data?.error || err.message)
      );
    }
  };

const handleSave = async () => {
    // pilih payload: preview (dataURL) jika ada, atau file (File)
    const payload = preview || file;
    if (!payload) {
      alert("Pilih tanda tangan dulu sebelum menyimpan");
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
        alert("Tanda tangan berhasil disimpan ke Cloudinary!");
      } else {
        throw new Error('Response upload tidak sesuai');
      }
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Upload gagal, coba lagi: " + (err.message || 'unknown'));
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
              onClick={() => setPreview(null)}
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
            className="block w-full text-sm text-gray-700 rounded-md px-2 py-1 cursor-pointer file:mr-3 file:py-1 file:px-4 file:rounded-md file:border file:border-gray-600 file:text-sm file:font-medium file:bg-transparent file:text-gray-600 "
          />
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              className="mt-3 w-32 py-2 bg-[#243B83] text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Upload
            </button>
            <button
              onClick={handleSave}
              className="mt-3 w-32 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
                {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
    
    </>
  )
}

export default UploadSignature