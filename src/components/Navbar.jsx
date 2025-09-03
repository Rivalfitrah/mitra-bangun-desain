"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Project", href: "/project" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#2E3D7D]">Mitra Bangun Desain</h1>
        </div>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-15">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 text-lg hover:text-[#2E3D7D] transition-colors relative group"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#2E3D7D] group-hover:w-full transition-all"></span>
            </Link>
          ))}
        </div>

        {/* Button Login */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-6 py-3 bg-[#2E3D7D] text-white rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#2E3D7D] transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 bg-[#2E3D7D] text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
