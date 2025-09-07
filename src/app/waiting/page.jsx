"use client";

import React from "react";

export default function WaitingConfirmation() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: "url('/assets/login/bg-Login.png')" }}
    >
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-sm p-10 text-center shadow-2xl border border-white/20">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 text-[#2E3D7D] animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-[#2E3D7D]">
          Akun Anda sedang dalam peninjauan
        </h2>
        <p className="mb-6 text-gray-600">
          Terima kasih telah mendaftar. Akun Anda telah kami terima dan akan segera ditinjau oleh tim admin.
        </p>
        <p className="text-sm text-gray-500 italic">
          Kami akan mengirimkan notifikasi melalui email setelah akun Anda disetujui.
        </p>
      </div>
    </div>
  );
}
