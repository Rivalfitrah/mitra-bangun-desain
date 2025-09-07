"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function ProyekKami() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  return (
    <div className="flex bg-white">
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
            Pengaturan
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
              Anda dapat meng-upload gambar hasil scan tanda tangan anda pada halaman ini. 
              Pastikan gambar cukup jelas. Adna juga dapat menggambar tanda tangan dibawah ini
            </p>
          </div>

          {/* Bagian Tanda Tangan */}
        <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-semibold text-[#243B83] mb-2">Tanda tangan saya</h2>

        {/* Preview tanda tangan */}
        <div className="flex flex-col items-start mb-4">
            <div className="w-48 h-24 border border-gray-600 rounded-md flex items-center justify-center overflow-hidden">
            <img
                src="/signature-sample.png"
                alt="Tanda Tangan"
                className="object-contain"
            />
            </div>
            <button className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition">
                Hapus
            </button>
        </div>

        <hr className="my-4" />

        {/* Upload tanda tangan */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-[#243B83] mb-2">
                Upload tanda tangan
            </label>
            
            <input
                type="file"
                className="block w-full text-sm text-gray-700 rounded-md px-2 py-1 cursor-pointer file:mr-3 file:py-1 file:px-4 file:rounded-md file:border file:border-gray-600 file:text-sm file:font-medium file:bg-transparent file:text-gray-600 "
            />
            <button className="mt-3 w-32 py-2 bg-[#243B83] text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Upload
            </button>
        </div>

        <hr className="my-4" />

        {/* Canvas tanda tangan */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-[#243B83]">
              gambar tanda tangan
            </label>
            <div className="w-full h-40 border rounded-md bg-gray-50">
            {/* Bisa pake canvas atau package kayak react-signature-canvas */}
            </div>
        </div>

        {/* Tombol aksi */}
        <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-[#243B83] text-white rounded-md hover:bg-blue-700 transition">
            Simpan
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Hapus
            </button>
        </div>
        </div>

        </div>
      </div>
    </div>
  );
}
