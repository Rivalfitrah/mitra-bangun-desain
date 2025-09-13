"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";
import { userActive, uploadDocument } from "@/lib/api";
import Swal from "sweetalert2";

export default function UnggahPage() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("Request Material");
  const [selectSigners, setSelectSigners] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const ambilUser = async () => {
      try {
        const response = await userActive();
        console.log("User aktif:", response);
        if (response.success && response.data) {
          setActiveUsers(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data user aktif:", error);
      }
    };
    ambilUser();
  }, []);

  // Filter users berdasarkan search query
  const filteredUsers = activeUsers.filter(user => 
    user.profil?.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tambah user ke daftar penandatangan
  const addSigner = (user) => {
    if (!selectSigners.find(signer => signer.id === user.id)) {
      setSelectSigners([...selectSigners, user]);
    }
    setSearchQuery("");
  };

  // Hapus user dari daftar penandatangan
  const removeSigner = (userId) => {
    setSelectSigners(selectSigners.filter(signer => signer.id !== userId));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Silakan unggah file terlebih dahulu.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (selectSigners.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Silakan pilih setidaknya satu penandatangan.',
        confirmButtonText: 'OK'
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload document
      const response = await uploadDocument({
        file: file,
        title: fileName,
        customId: `${docType.replace(/\s+/g, "_")}_${Date.now()}`,
        docType: docType,
        signers: selectSigners.map(s => ({ id: s.id })), // kirim id saja cukup
      });


      if (response.success) {
        console.log("Document uploaded successfully:", response.data);
        Swal.fire({
          icon: 'success',
          title: 'Sukses',
          text: 'Dokumen berhasil diunggah dan penandatangan telah diberi tahu via email.',
          confirmButtonText: 'OK'
        })
        
        // Reset form
        setFile(null);
        setFileName("");
        setDocType("Request Material");
        setSelectSigners([]);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat mengunggah dokumen. Silakan coba lagi.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="md:flex bg-white">
      {/* Sidebar */}
      <div className="fixed md:fixed md:top-0 md:left-0 md:h-full w-0 md:w-64bg-[#243B83] text-white shadow-lg z-40 transition-all duration-300">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-1 bg-white px-6 min-h-screen ml-0 md:ml-64">
        {/* HEADER */}
        <div className="min-h-screen bg-white p-4 md:p-6">
          <HeaderDashboard />

          <h1 className="text-2xl font-bold text-[#243B83] mb-6">
            Unggah Dokumen
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
              Di halaman ini Anda dapat mengunggah satu atau lebih dokumen untuk
              ditandatangani oleh satu atau lebih penanda tangan. Orang yang
              Anda minta untuk menandatangani dokumen akan mendapat notifikasi
              melalui e-mail.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 space-y-4">
            {/* Upload Box */}
            <div className="bg-white rounded-xl mb-6">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center h-70 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-500">Drag and drop berkas disini</p>
                <p className="text-xs text-gray-400">
                  (atau klik untuk memilih file)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
              </label>
              {fileName && (
                <p className="text-sm text-gray-700 mt-2">
                  File terpilih: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>

            {/* Nama Dokumen */}
            <div>
              <label className="block text-sm font-semibold text-[#243B83]">
                Nama Dokumen
              </label>
              <input
                type="text"
                placeholder="(otomatis berdasarkan nama file)"
                value={fileName}
                readOnly
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
              />
            </div>

            {/* Jenis Dokumen */}
            <div>
              <label className="block text-sm font-semibold text-[#243B83] mt-5">
                Jenis Dokumen
              </label>
              <select 
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black"
              >
                <option value="Request Material">Request Material</option>
                <option value="Laporan Harian">Laporan Harian</option>
                <option value="Invoice">Invoice</option>
                <option value="RAB">RAB</option>
              </select>
            </div>

            {/* Daftar Penanda Tangan */}
            <div>
              <label className="block text-sm font-semibold text-[#243B83] mt-5">
                Daftar Penanda Tangan
              </label>
              <div className="md:flex gap-2 mt-1 relative">
                <input
                  type="text"
                  placeholder="Cari nama penanda tangan"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-gray-400 rounded-lg p-2 text-black"
                />
                
                {/* Dropdown hasil pencarian */}
                {searchQuery && filteredUsers.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center gap-3"
                        onClick={() => addSigner(user)}
                      >
                        {user.profil?.imageUrl && (
                          <img
                            src={user.profil.imageUrl}
                            alt={user.profil?.nama || user.email}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{user.profil?.nama || 'No Name'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">{user.profil?.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Daftar penandatangan terpilih */}
              {selectSigners.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Penandatangan yang dipilih:</p>
                  <div className="space-y-2">
                    {selectSigners.map((signer) => (
                      <div key={signer.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          {signer.profil?.imageUrl && (
                            <img
                              src={signer.profil.imageUrl}
                              alt={signer.profil?.nama || signer.email}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{signer.profil?.nama || 'No Name'}</p>
                            <p className="text-sm text-gray-500">{signer.email}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSigner(signer.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              disabled={isUploading || !file || selectSigners.length === 0}
              className={`w-full py-2 rounded-lg text-white font-medium ${
                isUploading || !file || selectSigners.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#243B83] hover:bg-blue-700'
              }`}
            >
              {isUploading ? 'Mengupload...' : 'Simpan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
