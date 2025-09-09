'use client';
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";
import RecentRequest from "@/components/RecentRequest";

export default function Page() {

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <div className="fixed md:fixed md:top-0 md:left-0 md:h-full w-0 md:w-64bg-[#243B83] text-white shadow-lg z-40 transition-all duration-300">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-1 bg-white px-6 min-h-screen ml-0 md:ml-64">
        <div className="min-h-screen bg-white p-4 md:p-6">
          {/* HEADER */}
          <HeaderDashboard />


          {/* WELCOME CARD */}
          <div className="bg-[#243B83] text-white rounded-xl flex flex-col md:flex-row justify-between">
            {/* Text bagian kiri */}
            <div className="flex flex-col justify-between px-10 py-10">
              <div>
                <h2 className="text-lg">Welcome back,</h2>
              </div>
              <p className="text-sm opacity-90 mt-4">Do you ready for today?</p>
            </div>

            {/* Gambar bagian kanan */}
            <img
              src="/assets/dashboard/welcome.png"
              alt="Illustration"
              className="w-40 md:w-1/3 mt-4 md:mt-2"
            />
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {[
              { title: "request material", value: 100, pending: 25 },
              { title: "Laporan Harian", value: 100, pending: 25 },
              { title: "Invoice", value: 100, pending: 25 },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <h3 className="font-medium capitalize text-[#2E3D7D]">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#2E3D7D]">{card.value}</p>
                <p className="text-sm text-red-500 mt-1">🔴 {card.pending} Pending</p>
              </div>
            ))}
          </div>

          {/* CHART + RECENT REQUESTS */}
          <RecentRequest />
        </div>
      </div>
    </div>
  );
}
