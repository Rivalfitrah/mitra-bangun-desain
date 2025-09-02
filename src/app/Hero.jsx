import About from "@/components/AboutUs";
import Services from "@/components/Services";
import OurProject  from "@/components/OurProject";
import Faq from "@/components/Faq";
import BlogServer from "@/components/BlogServer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-center bg-cover bg-center mt-20"
        style={{
          backgroundImage: "url('./assets/compro/Hero-image.png')", 
        }}
      >

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Invest Today in <br /> Your <span className="text-[#EE7D3B]">Dream Home</span>
          </h1>

          <p className="mt-4 text-gray-200 text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="px-6 py-3 bg-[#EE7D3B] text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 active:scale-95 transition transform"
            >
              View Property
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black active:scale-95 transition transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <About />

      <Services />

      <div className="bg-[#2d3a74] py-16">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
          Our <span className="text-[#EE7D3B]">Completed Projects</span>
        </h2>
        <OurProject />
        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-[#EE7D3B] text-white px-6 py-3 rounded-md font-medium hover:bg-orange-400 transition">
            View All Project
          </button>
        </div>
      </div>

      <Faq />

      <BlogServer />

      <Contact />

      <Footer />
    </div>

  );
}
