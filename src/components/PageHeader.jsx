"use client";
import React from "react";
import Link from "next/link";

export default function PageHeader({ title, breadcrumb }) {
  return (
    <section className="w-full bg-gray-50 md:pt-30 pt-25">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E3D7D]">
          {title}
        </h1>

        {/* Breadcrumb */}
        <p className="mt-2 text-sm md:text-base text-black">
          <Link href="/" className="text-gray-700 hover:text-[#2E3D7D]">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-[#EE7D3B] font-medium">{breadcrumb}</span>
        </p>
      </div>
      {/* Bottom Border */}
      <div className="h-6 md:h-12 bg-[#2E3D7D] mt-5" />
    </section>
  );
}
