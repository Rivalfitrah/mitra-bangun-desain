"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function downloadLaporanHarian() {
  const [fileName, setFileName] = useState("");
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
            Laporan Harian
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
              Silahkan download dokumen dengan menekan tombol dibawah ini
            </p>
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full bg-[#243B83] text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
