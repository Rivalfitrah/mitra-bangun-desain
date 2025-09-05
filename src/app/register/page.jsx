"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { register } from "@/lib/api";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter(); // ✅ tambahkan ini

const handleSubmit = async (e) => {
  e.preventDefault(); // supaya form tidak reload halaman

  try {
    const response = await register(name, email, password);

    Swal.fire({
      icon: "success",
      title: "Registrasi Berhasil",
      text: "Silakan login dengan akun Anda.",
    });

    router.push("/login");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Registrasi Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan saat registrasi.",
    });
    console.error("Error during registration:", error);
  }
};


  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/assets/login/bg-Login.png')" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <h2 className="mb-2 text-center text-2xl font-semibold text-[#2E3D7D]">
          Sign <span className="text-[#EE7D3B]">Up</span>
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Please complete the data below to create an account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#2E3D7D] px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#2E3D7D] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
