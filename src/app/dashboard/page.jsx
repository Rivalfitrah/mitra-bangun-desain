"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";
import { userLogin } from "@/lib/api"; // pastikan pathnya benar

export default function Page() {
  const [recent] = useState([
    { id: "RM-001", date: "Apr 06, 2025", status: "Approved" },
    { id: "RM-002", date: "Apr 06, 2025", status: "Approved" },
    { id: "RM-003", date: "Apr 06, 2025", status: "Pending" },
    { id: "RM-004", date: "Apr 06, 2025", status: "Pending" },
    { id: "RM-005", date: "Apr 06, 2025", status: "Approved" },
  ]);

    const [user, setUser] = useState(null)
  
    useEffect(() => {
      // Fetch user data from API or context
      const fetchUser = async () => {
        try {
          const userData = await userLogin();
          setUser(userData);
          console.log("Fetched user data:", userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
      fetchUser();
    }, []);

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
                <h1 className="text-2xl font-bold">{user?.name || "loading..."}</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Proyek */}
            <div className="md:col-span-2 bg-[#2E3D7D] text-white rounded-xl p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Progress Proyek</h3>
                <button className="bg-white text-[#2E3D7D] px-3 py-1 text-sm rounded-lg">
                  Perbarui
                </button>
              </div>
              <p className="text-sm mb-4">Statistik proyek Mingguan</p>

              {/* Placeholder Chart */}
              <div className="h-56 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-sm opacity-70">[ Chart Here ]</span>
              </div>
            </div>

            {/* Recent Request */}
            <div className="bg-[#243B83] text-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-4">Recent Request Material</h3>
              <ul className="space-y-4">
                {recent.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">#{item.id}</p>
                      <p className="text-xs opacity-80">{item.date}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        item.status === "Approved" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
