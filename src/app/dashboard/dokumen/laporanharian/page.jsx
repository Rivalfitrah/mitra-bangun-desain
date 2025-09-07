"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function LaporanHarian() {
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const handleClick = () => {
    router.push("/dokumen/laporanharian/download");
  };

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
  

        <h1 className="text-2xl font-bold text-[#243B83] mb-6">Laporan Harian</h1>

        {/* Info Box */}
        <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
          <h2 className="font-semibold text-[#243B83]">Informasi</h2>
          <p className="text-md text-gray-600 mt-1">
            Di halaman ini Anda dapat membuat dokumen laporan harian dengan mengisi beberapa pertanyaan, 
            setelah itu silahkan download terlebih dahulu dokumennya karena pembuatan dokumen ini tidak tersimpan di database.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 space-y-6">
          {/* Kondisi Material */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83]">
              Kondisi Material
            </label>
            <input
              type="text"
              placeholder="Masukkan kondisi material"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
            />
          </div>


          {/* Progress */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83]">
              Progress
            </label>
            <input
              type="text"
              placeholder="Masukkan Progress"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
            />
          </div>


          {/* Cuaca */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83]">
              Cuaca
            </label>
            <select className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black">
              <option>Cerah</option>
              <option>Hujan</option>
              <option>Badai</option>
            </select>
          </div>


          {/* Kendala */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83]">
              Kendala
            </label>
            <input
              type="text"
              placeholder="Masukkan Kendala"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
            />
          </div>


            {/* Upload Box */}
            <div className="bg-white mb-6">
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
                <p className="text-gray-500">Drag and drop foto disini</p>
                <p className="text-xs text-gray-400">(atau klik untuk memilih foto)</p>
                <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                />
            </label>
            {fileName && (
                <p className="text-sm text-gray-700 mt-2">
                File terpilih: <span className="font-medium">{fileName}</span>
                </p>
            )}
            </div>

            {/* Tombol Simpan */}
            <button
                onClick={handleClick}
                type="button"
                className="w-full bg-[#243B83] text-white py-2 rounded-lg hover:bg-blue-700"
            >
                Simpan
            </button>
        </form>
        </div>
      </div>
    </div>
  );
}
