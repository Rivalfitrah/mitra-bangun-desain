"use client";

import { useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "Siapa Kami" },
    { id: "vision", label: "Visi" },
    { id: "mission", label: "Misi" },
  ];

  const tabContent = {
    about: "Kami adalah perusahaan properti yang berkomitmen untuk menghadirkan hunian impian dengan kualitas terbaik, desain modern, dan lokasi strategis.",
    vision: "Menjadi pengembang properti terpercaya yang memberikan solusi hunian berkelanjutan dan inovatif untuk masyarakat.",
    mission:
      "Memberikan layanan terbaik, menghadirkan hunian berkualitas tinggi, serta membangun kepercayaan jangka panjang dengan setiap pelanggan.",
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto px-6 md:px-30 grid md:grid-cols-2 gap-15 items-start">
        {/* Left Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src="/assets/compro/AboutUs-image.png" 
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-gray-500 mb-2">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EE7D3B] mb-6">
            About <span className="text-[#2E3D7D]">Our Company</span>
          </h2>

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? "bg-[#2E3D7D] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <p className="text-gray-600 leading-relaxed">
            {tabContent[activeTab]}
          </p>
        </div>
      </div>
    </section>
  );
}
