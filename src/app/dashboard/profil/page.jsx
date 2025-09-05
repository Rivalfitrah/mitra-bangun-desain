"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function profil() {
  const [currentPage, setCurrentPage] = useState(1);

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
          <header className="flex justify-end items-center gap-4 mb-6">
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <Bell size={22} className="text-white" />
            </button>
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <LogOut size={22} className="text-white" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                <img src="/assets/dashboard/default-profile.png" alt="Profile" className="w-full h-full object-cover rounded-full"/>
              </div>
              <span className="hidden md:inline text-[#243B83] font-medium">
                Admin
              </span>
            </div>
          </header>

          <h1 className="text-2xl font-bold text-[#243B83] mb-6">
            Profil
          </h1>

        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kartu Kiri */}
                <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 md:p-10 rounded-lg flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <span className="text-4xl text-gray-600">👤</span>
                </div>
                <h2 className="text-lg font-semibold text-[#243B83]">Admin2</h2>
                <p className="text-sm text-gray-500 mb-4">Direktur</p>

                <div className="w-full divide-y text-sm text-[#243B83]">
                    <div className="flex justify-between py-4">
                    <span>Total unggah</span>
                    <span className="font-semibold">100</span>
                    </div>
                    <div className="flex justify-between py-4">
                    <span>Total Ditandatangani</span>
                    <span className="font-semibold">100</span>
                    </div>
                    <div className="flex justify-between py-4">
                    <span>Permintaan Tanda Tanga</span>
                    <span className="font-semibold">2</span>
                    </div>
                </div>
                </div>

                {/* Form Kanan */}
                <div className="md:col-span-2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]  rounded-lg p-6 md:p-10">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Nama */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama
                    </label>
                    <input
                        type="text"
                        placeholder="Ex. John"
                        className="w-full border rounded-md px-3 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#243B83]"
                    />
                    </div>

                    {/* Role */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <input
                        type="text"
                        value="Direktur"
                        readOnly
                        className="w-full border rounded-md px-3 py-3 text-sm bg-gray-100 text-gray-600"
                    />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Ex. John"
                        className="w-full border rounded-md px-3 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#243B83]"
                    />
                    </div>

                    {/* Phone number */}
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone number
                    </label>
                    <input
                        type="tel"
                        placeholder="62xxxxxxxx"
                        className="w-full border rounded-md px-3 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#243B83]"
                    />
                    </div>

                    {/* Tombol */}
                    <div className="md:col-span-2 flex justify-start">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#243B83] text-white rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                    </div>
                </form>
                </div>
            </div>

        </div>
        </div>
      </div>
    </div>
  );
}
