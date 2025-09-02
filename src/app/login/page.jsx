"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/assets/login/bg-Login.png')" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-[#2E3D7D]">
          Welcome
        </h2>
        <h3 className="mb-2 text-center text-2xl font-semibold text-[#2E3D7D]">
          Mitra <span className="text-[#EE7D3B]">Bangun Desain</span>
        </h3>
        <p className="mb-6 text-center text-sm text-gray-500">
          Please enter your details to sign in
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <a href="#" className="mt-3 block text-right text-sm text-[#2E3D7D] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#2E3D7D] px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-full bg-gray-200"></span>
          <span className="mx-2 text-sm text-gray-400">Or</span>
          <span className="h-px w-full bg-gray-200"></span>
        </div>

        {/* Google Sign-In */}
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
        >
          <FcGoogle size={20} /> Sign in with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account yet?{" "}
          <a href="/register" className="font-medium text-[#2E3D7D] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
