"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function Invoice() {
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const [nominal, setNominal] = useState("");
  const [total, setTotal] = useState("");

  // fungsi format rupiah
  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleNominalChange = (e) => {
    setNominal(formatRupiah(e.target.value));
  };

  const handleTotalChange = (e) => {
    setTotal(formatRupiah(e.target.value));
  };


  const handleClick = () => {
    router.push("/dashboard/dokumen/invoice/download");
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

        <h1 className="text-2xl font-bold text-[#243B83] mb-6">Invoice</h1>

        {/* Info Box */}
        <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
          <h2 className="font-semibold text-[#243B83]">Informasi</h2>
          <p className="text-md text-gray-600 mt-1">
            Di halaman ini Anda dapat membuat dokumen Invoice dengan mengisi beberapa pertanyaan, 
            setelah itu silahkan download terlebih dahulu dokumennya karena pembuatan dokumen ini tidak tersimpan di database.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 space-y-6">
          {/* Nama Proyek */}
          <div>
            <label className="block text-sm font-semibold text-[#243B83]">
              Nama Proyek
            </label>
            <input
              type="text"
              placeholder="Masukkan nama proyek"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
            />
          </div>


        {/* Deskripsi */}
            <div>
                <label className="block text-sm font-semibold text-[#243B83]">
                Deskripsi
                </label>
                <textarea
                placeholder="Masukan Deskripsi"
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white resize-none"
                rows={4}
                style={{ maxHeight: "200px", overflowY: "auto" }}
                />
            </div>

            {/* Nominal */}
            <div>
                <label className="block text-sm font-semibold text-[#243B83]">
                Nominal
                </label>
                <input
                type="text"
                value={nominal}
                onChange={handleNominalChange}
                placeholder="Masukan nominal"
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
                />
            </div>

            {/* Total */}
            <div>
                <label className="block text-sm font-semibold text-[#243B83]">
                Total
                </label>
                <input
                type="text"
                value={total}
                onChange={handleTotalChange}
                placeholder="Masukan total"
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-black bg-white"
                />
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
