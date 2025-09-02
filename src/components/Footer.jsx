"use client";

import { FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiChevronRight, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#2C387E] text-white py-12 px-6 md:px-30">
      <div className="w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:justify-items-start md:[&>*:nth-child(2)]:justify-self-center md:[&>*:nth-child(3)]:justify-self-end">
        
        {/* Brand + Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mitra Bangun Desain</h2>
          <p className="text-gray-200 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          <div className="flex gap-3">
            {/* Social Media */}
            <a href="#" className="bg-[#EE7D3B] p-3 rounded-md hover:bg-orange-600 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-[#EE7D3B] p-3 rounded-md hover:bg-orange-600 transition">
              <FaTiktok size={20} />
            </a>
            <a href="#" className="bg-[#EE7D3B] p-3 rounded-md hover:bg-orange-600 transition">
              <FaYoutube size={20} />
            </a>
            <a href="#" className="bg-[#EE7D3B] p-3 rounded-md hover:bg-orange-600 transition">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor"].map(
              (item, idx) => (
                <li key={idx} className="flex items-center group">
                  <FiChevronRight className="mr-2 text-[#EE7D3B] group-hover:translate-x-1 transition" />
                  <a href="#" className="hover:text-[#EE7D3B] transition">{item}</a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FiMapPin className="text-[#EE7D3B]" /> <span>Ruko STA Blok B No.20, Sentul City, Kabupaten Bogor, Jawa Barat 16810</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-[#EE7D3B]" /> <span>0811-879-603</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-[#EE7D3B]" /> <span>Lorem ipsum dolor</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
