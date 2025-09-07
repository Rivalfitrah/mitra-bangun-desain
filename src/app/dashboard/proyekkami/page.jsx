"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function ProyekKami() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/proyekkami/tambahproyek");
 };

  const data = Array.from({ length: 25 }, (_, i) => ({
    no: i + 1,
    image: "file gambar",
    name: "Dokumen A",
    upload: "19/2/2025",
    description: "Lorem1426",
  }));

  // hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // data per halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="md:flex bg-white">
      {/* Sidebar */}
      <div className="fixed md:fixed md:top-0 md:left-0 md:h-full w-0 md:w-64 bg-white text-white shadow-lg z-40 transition-all duration-300">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-1 bg-white px-6 min-h-screen ml-0 md:ml-64">
        {/* HEADER */}
        <div className="min-h-screen bg-white p-4 md:p-6">

          <HeaderDashboard />


          <h1 className="text-2xl font-bold text-[#243B83] mb-6">
            Proyek kami
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
              Berikut ini daftar proyek yang sudah ditangani oleh mitra bangun desain. 
              anda bisa mengatur ini untuk ditampilkan di company profil
            </p>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 border-[#243B83] border rounded-lg shadow-sm hover:bg-[#243B83] hover:text-white text-[#243B83]">
              Sortir
            </button>
            <button 
                onClick={handleClick}
                className="px-6 py-3 bg-[#243B83] border rounded-lg shadow-sm hover:bg-blue-700 text-white">
                Tambah
            </button>
          </div>

          {/* Tabel scrollable */}
          <div className="overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#243B83] text-white text-left">
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Nama Dokumen</th>
                  <th className="px-6 py-3">Upload</th>
                  <th className="px-6 py-3">Deskripsi</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.no} className="border-b text-[#243B83]">
                    <td className="px-6 py-2">{item.no}</td>
                    <td className="px-6 py-2">{item.image}</td>
                    <td className="px-6 py-2">{item.name}</td>
                    <td className="px-6 py-2">{item.upload}</td>
                    <td className="px-6 py-2">{item.description}</td>
                    <td className="px-6 py-2 flex gap-2">
                      <button className="px-3 py-1 bg-white border border-[#243B83] text-[#243B83] rounded hover:bg-[#243B83] hover:text-white">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-1 rounded 
                    ${currentPage === 1 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-[#243B83] font-medium"
                    }`}
                >
                <ChevronLeft size={18} /> Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-[#243B83] text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-1 rounded 
                    ${currentPage === totalPages 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-[#243B83] font-medium"
                    }`}
                >
                Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
