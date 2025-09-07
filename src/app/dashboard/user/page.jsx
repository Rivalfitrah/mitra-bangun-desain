"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";
import { userPending } from "@/lib/api"; // pastikan pathnya benar

export default function ProyekKami() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userPending();
        setUsers(usersData); // simpan ke state
        console.log("Pending users:", usersData);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
          <div className="overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#243B83] text-white text-left">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Tidak ada user pending
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b text-black">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.profil?.role || "-"}</td>
                      <td className="px-6 py-4">{user.status}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:underline">
                          Confirm
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
