"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
          <header className="flex justify-end items-center gap-4 mb-6">
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <Bell size={22} className="text-white" />
            </button>
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <LogOut size={22} className="text-white" />
            </button>
            <div onClick={() => router.push("/dashboard/profil")} className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                <img src="/assets/dashboard/default-profile.png" alt="Profile" className="w-full h-full object-cover rounded-full"/>
              </div>
              <span className="hidden md:inline text-[#243B83] font-medium">
                Admin
              </span>
            </div>
          </header>

          <h1 className="text-2xl font-bold text-[#243B83] mb-6">
            Konfirmasi User
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
                Di halaman ini Anda dapat mengonfirmasi user yang telah mendaftar.
            </p>
          </div>

            {/* Tabel */}
            <div className="overflow-x-auto">
<table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        
      </table>
            </div>
        </div>
      </div>
    </div>
  );
}
