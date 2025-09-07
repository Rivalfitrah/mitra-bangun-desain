"use client";

import {
  Home,
  FileText,
  Settings,
  Upload,
  FileSignature,
  Folder,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  return (
    <>
      {/* Topbar hanya muncul di mobile */}
      <div className="md:hidden bg-white text-[#243B83] p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full md:h-auto w-64 bg-[#243B83] text-white flex flex-col shadow-lg z-40
          transform transition-transform duration-300
          md:fixed md:translate-x-0 md:rounded-2xl md:m-5 pb-0 md:pb-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header Logo */}
        <div className="p-6">
          <h1 className="text-lg font-bold leading-tight">
            MITRA BANGUN <br /> DESAIN
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {/* Beranda */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 p-2 rounded-lg font-medium
              ${pathname === "/dashboard"
                ? "bg-white text-[#243B83]"
                : "hover:bg-blue-800"
              }`}
          >
            <Home size={20} />
            <span>Beranda</span>
          </Link>

          {/* Tanda Tangan */}
          <div>
            <div
              className={`
                flex items-center gap-3 p-2 rounded-md cursor-pointer
                ${pathname.startsWith("/dashboard/tandatangan")
                  ? "bg-white text-[#243B83] font-medium"
                  : "hover:bg-blue-800"}
              `}
            >
              <FileSignature size={20} />
              <span>Tanda Tangan</span>
            </div>

            <div className="ml-8 mt-1 space-y-2 text-md">
              {[
                { label: "Permintaan", href: "/dashboard/tandatangan/permintaan" },
                { label: "Unggah", href: "/dashboard/tandatangan/unggah" },
                { label: "Diunggah", href: "/dashboard/tandatangan/diunggah" },
                { label: "Ditandatangani", href: "/dashboard/tandatangan/ditandatangani" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-left hover:text-gray-300"
                >
                  <span
                    className={`w-4 h-4 rounded-full border
                      ${pathname === item.href
                        ? "bg-white border-white"
                        : "border-gray-300"
                      }`}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Dokumen */}
          <div>
            <div
              className={`
                flex items-center gap-3 p-2 rounded-md cursor-pointer
                ${pathname.startsWith("/dashboard/dokumen")
                  ? "bg-white text-[#243B83] font-medium"
                  : "hover:bg-blue-800"}
              `}
            >
              <FileText size={20} />
              <span>Dokumen</span>
            </div>

            <div className="ml-8 mt-1 space-y-2 text-md">
              {[
                { label: "Laporan Harian", href: "/dashboard/dokumen/laporanharian" },
                { label: "Invoice", href: "/dashboard/dokumen/invoice" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-left hover:text-gray-300"
                >
                  <span
                    className={`w-4 h-4 rounded-full border
                      ${pathname === item.href
                        ? "bg-white border-white"
                        : "border-gray-300"
                      }`}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wordpress */}
          <Link
            href="https://wordpress.com/home/mitrabangundesain.wordpress.com"
            rel="noopener noreferrer"
            target="_blank"
            className={`flex items-center gap-3 p-2 rounded-md
              ${pathname === "/wordpress"
                ? "bg-white text-[#243B83]"
                : "hover:bg-blue-800"
              }`}
          >
            <Upload size={20} />
            <span>Wordpress</span>
          </Link>

          {/* Proyek Kami */}
          <Link
            href="/dashboard/proyekkami"
            className={`flex items-center gap-3 p-2 rounded-md
              ${pathname === "/dashboard/proyekkami"
                ? "bg-white text-[#243B83]"
                : "hover:bg-blue-800"
              }`}
          >
            <Folder size={20} />
            <span>Proyek Kami</span>
          </Link>

          {/* Pengaturan */}
          <Link
            href="/dashboard/pengaturan"
            className={`flex items-center gap-3 p-2 rounded-md
              ${pathname === "/dashboard/pengaturan"
                ? "bg-white text-[#243B83]"
                : "hover:bg-blue-800"
              }`}
          >
            <Settings size={20} />
            <span>Pengaturan</span>
          </Link>

          <Link
            href="/dashboard/user"
            className={`flex items-center gap-3 p-2 rounded-md
              ${pathname === "/dashboard/user"
                ? "bg-white text-[#243B83]"
                : "hover:bg-blue-800"
              }`}
          >
            <Settings size={20} />
            <span>Users</span>
          </Link>
        </nav>
      </div>

      {/* Overlay background pas sidebar open di mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
