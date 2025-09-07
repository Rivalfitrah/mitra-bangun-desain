"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function DetailDiunggah() {
  const [progress, setProgress] = useState(50);
  const router = useRouter();

    const data = Array.from({ length: 4 }, (_, i) => ({
    name: "Dokumen A",
    persetujuan: i % 2 === 0 ? "Approved" : "Pending",
    ditandatangani: "Kamis, 10 Agustus 2025",
    keterangan:  "Ditandatangani oleh Lorem1426",
  }));

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
            Detail Dokumen
          </h1>

         <div className="w-full mx-auto space-y-6">
            {/* Tanggal Upload */}
            <div className="grid grid-cols-3 items-start">
                <p className="text-sm font-semibold text-[#243B83] col-span-1">
                    Tanggal Upload
                </p>
                <div className="col-span-2">
                    <p className="text-base font-medium text-[#243B83]">
                    Kamis, 10 Agustus 2025
                    </p>
                    <p className="text-sm text-gray-500">Oleh : Admin2</p>
                </div>
            </div>

            {/* Progress Penandatangan */}
            <div className="grid md:grid-cols-3 items-center">
                <p className="text-sm font-semibold text-[#243B83] col-span-1">
                    Penandatanganan
                </p>
                <div className="col-span-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">1 / 2</p>
                </div>
            </div>


            {/* PDF Viewer */}
            <div className="border rounded-lg overflow-hidden shadow">
                <iframe
                src="/contoh.pdf" // ganti dengan file pdf
                className="w-full h-72 md:h-96"
                ></iframe>
            </div>

            {/* Tabel scrollable */}
            <div className="overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-[#243B83] text-white text-left">
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Persetujuan</th>
                    <th className="px-4 py-3">Ditandatangani</th>
                    <th className="px-4 py-3">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="border-b text-[#243B83]">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">
                            <span
                            className={`font-medium ${
                                item.persetujuan === "Approved"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                            >
                            {item.persetujuan}
                            </span>
                        </td>
                        <td className="px-4 py-3">{item.ditandatangani}</td>
                        <td className="px-4 py-3">{item.keterangan}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>

       
        </div>
      </div>
    </div>
  );
}
