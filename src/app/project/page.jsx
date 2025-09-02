"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import PageHeader from "@/components/PageHeader";
import OurProject from '@/components/OurProject';
import Footer from '@/components/Footer'

const page = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="Our Projects" breadcrumb="Project" />
    <div className="bg-white py-16">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#2d3a74] mb-12">
          Our <span className="text-[#EE7D3B]">Completed Projects</span>
        </h2>
        <OurProject />
    </div>
    <Footer />
    </>
  )
}

export default page