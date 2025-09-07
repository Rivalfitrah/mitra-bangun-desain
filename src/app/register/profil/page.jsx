"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaCamera, FaEdit } from "react-icons/fa";
import { detailProfil} from "@/lib/api";
import Swal from "sweetalert2";


export default function Profil() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    phone: "",
    alamat: "",
    role: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleImageClick = () => {
  fileInputRef.current?.click();
};

const handleImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file)); // ✅ tampilkan preview
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const userId = localStorage.getItem("userId"); // ✅ ambil dari storage

    const res = await detailProfil({
      userId,
      phone: formData.phone,
      alamat: formData.alamat,
      role: formData.role,
      image: profileImage, // ✅ ganti imageFile → profileImage
    });

    console.log("Profil berhasil disimpan:", res);
    Swal.fire("Sukses", "Profil berhasil disimpan!", "success");
    router.push("/login"); // arahkan ke halaman login setelah sukses
  } catch (error) {
    console.error("Gagal simpan profil:", error);
    Swal.fire("Error", "Gagal menyimpan profil. Coba lagi!", "error");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: "url('/assets/login/bg-Login.png')" }}
    >
      <div className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-sm p-10 shadow-2xl border border-white/20">

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#2E3D7D]/20 cursor-pointer
                         transition-all duration-300 hover:border-[#2E3D7D]/60 hover:shadow-lg"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <FaUserCircle className="text-6xl text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                       flex items-center justify-center rounded-full">
                <FaCamera className="text-white text-2xl" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute -bottom-2 -right-2 bg-[#2E3D7D] hover:bg-blue-700 text-white rounded-full p-3
                                     shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FaEdit className="text-sm" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Klik untuk mengganti foto profil
          </p>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-center text-3xl font-bold text-[#2E3D7D] tracking-tight">
          Lengkapi Profil
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="62xxxxxxxxxx"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border-2 text-black px-4 py-3.5 text-sm
                                     transition-all duration-300 focus:outline-none
                                     focus:ring-4 focus:ring-[#2E3D7D]/10 placeholder:text-gray-400
                                     hover:border-gray-300 bg-gray-50/50 focus:bg-white
                                     border-gray-200 focus:border-[#2E3D7D]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              name="alamat"
              placeholder="Masukkan alamat lengkap"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border-2 text-black px-4 py-3.5 text-sm
                                     transition-all duration-300 focus:outline-none
                                     focus:ring-4 focus:ring-[#2E3D7D]/10 placeholder:text-gray-400
                                     hover:border-gray-300 bg-gray-50/50 focus:bg-white resize-none
                                     border-gray-200 focus:border-[#2E3D7D]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role/Jabatan
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border-2 text-black px-4 py-3.5 text-sm
                                     transition-all duration-300 focus:outline-none
                                     focus:ring-4 focus:ring-[#2E3D7D]/10 bg-gray-50/50 focus:bg-white
                                     hover:border-gray-300 appearance-none cursor-pointer
                                     border-gray-200 focus:border-[#2E3D7D]"
              required
            >
              <option value="" disabled>Pilih role Anda</option>
              <option value="direktur">Direktur</option>
              <option value="finance">Finance</option>
              <option value="lapangan">Lapangan</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-xl px-6 py-4
                                     font-semibold text-white text-lg transition-all duration-300
                                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#2E3D7D]/30
                                     ${isLoading
                                       ? 'bg-gray-400 cursor-not-allowed'
                                       : 'bg-gradient-to-r from-[#2E3D7D] to-blue-600 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]'
                                     }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                Menyimpan...
              </div>
            ) : (
              "Lanjutkan"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
