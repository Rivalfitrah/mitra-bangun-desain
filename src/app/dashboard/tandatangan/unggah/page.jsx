"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";


export default function UnggahPage() {
  const [fileName, setFileName] = useState("");
  const router = useRouter();
  
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
          <header className="flex justify-end items-center gap-4 mb-6">
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <Bell size={22} />
            </button>
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <LogOut size={22} />
            </button>
            <div onClick={() => router.push("/dashboard/profil")} className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                <img src="/assets/dashboard/default-profile.png" alt="Profile" className="w-full h-full object-cover rounded-full"/>
              </div>
              <span className="hidden md:inline text-[#243B83] font-medium">Admin</span>
            </div>
          </header>

        <h1 className="text-2xl font-bold text-[#243B83] mb-6">Unggah Dokumen</h1>

        {/* Info Box */}
        <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
          <h2 className="font-semibold text-[#243B83]">Informasi</h2>
          <p className="text-md text-gray-600 mt-1">
            Di halaman ini Anda dapat mengunggah satu atau lebih dokumen untuk
            ditandatangani oleh satu atau lebih penanda tangan. Orang yang Anda
            minta untuk menandatangani dokumen akan mendapat notifikasi melalui e-mail.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 space-y-4">
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
              <p className="text-xs text-gray-400">(atau klik untuk memilih file)</p>
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
            <select className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black">
              <option>Request Material</option>
              <option>Laporan Harian</option>
              <option>Invoice</option>
              <option>RAB</option>
            </select>
          </div>


          {/* Daftar Penanda Tangan */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83] mt-5">
              Daftar Penanda Tangan
            </label>
            <div className="md:flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Cari nama penanda tangan"
                className="flex-1 border border-gray-400 rounded-lg p-2 text-black"
              />
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-xl m-2 md:m-0 hover:bg-green-600"
              >
                +
              </button>
              <button
                type="button"
                className="px-5 py-2 bg-red-500 text-white rounded-lg text-xl hover:bg-red-600"
              >
                -
              </button>
            </div>
          </div>


          {/* Tombol Simpan */}
          <button
            type="submit"
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
