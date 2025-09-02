"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Profil() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push("/dashboard"); // ✅ sekarang router defined
  };


  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/assets/login/bg-Login.png')" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Icon User */}
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-gray-700" />
        </div>

        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#2E3D7D]">
          Profil
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ex. John"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm 
                         focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] 
                         placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="62xxxxxxxxxx"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm 
                         focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] 
                         placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm 
                         focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] 
                         placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="Enter Your role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm 
                         focus:border-[#2E3D7D] focus:outline-none focus:ring-2 focus:ring-[#2E3D7D] 
                         placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#2E3D7D] px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
