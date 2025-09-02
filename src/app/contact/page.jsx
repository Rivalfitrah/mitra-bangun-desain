"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import PageHeader from "@/components/PageHeader";
import Contact from '@/components/Contact';
import Footer from '@/components/Footer'

const page = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="Contact Us" breadcrumb="Contact" />
    <Contact />
    <Footer />
    </>
  )
}

export default page