'use client';
import React from 'react'
import { useState } from 'react'

function RecentRequest() {
      const [recent] = useState([
    { id: "RM-001", date: "Apr 06, 2025", status: "Approved" },
    { id: "RM-002", date: "Apr 06, 2025", status: "Approved" },
    { id: "RM-003", date: "Apr 06, 2025", status: "Pending" },
    { id: "RM-004", date: "Apr 06, 2025", status: "Pending" },
    { id: "RM-005", date: "Apr 06, 2025", status: "Approved" },
  ]);
  return (
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
  )
}

export default RecentRequest