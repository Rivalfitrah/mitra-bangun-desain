"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import AboutUs from '@/components/AboutUs'
import PageHeader from "@/components/PageHeader";
import OurTeam from '@/components/OurTeam';
import Footer from '@/components/Footer'

const page = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="About Us" breadcrumb="About Us" />
    <AboutUs />
    <OurTeam />
    <Footer />
    </>
  )
}

export default page