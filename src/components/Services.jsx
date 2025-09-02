"use client";

import { Building2, Paintbrush, Ruler, ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Bangunan Sipil",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Renovasi",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    icon: Paintbrush,
  },
  {
    id: 3,
    title: "Desain",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    icon: Ruler,
  },
  {
    id: 4,
    title: "Interior",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    icon: Paintbrush,
  },
  {
    id: 5,
    title: "Landscape",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    icon: Ruler,
  },
];

export default function Services() {
  return (
    <section className="pt-12 pb-20 px-6 md:px-30 bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-10 text-center">
        <span className="text-[#2E3D7D]">Our</span>{" "}
        <span className="text-[#EE7D3B]">Service</span>
      </h2>

      {/* Grid max 4 kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.slice(0, 3).map((service) => (
            <div
            key={service.id}
            className="w-full min-h-[280px] bg-white border rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:-translate-y-2"
            >
            {/* Kotak biru + icon */}
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-[#2E3D7D] rounded">
                <service.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-black">{service.title}</h3>
            <p className="text-lg text-gray-600">{service.desc}</p>
            </div>
        ))}

        {/* Card More */}
        <div className="bg-[#2E3D7D] rounded-xl flex flex-col justify-center items-start text-white p-6 cursor-pointer transition hover:-translate-y-2">
            <p className="text-2xl font-semibold mb-4">
            Jelajahi lebih banyak <br /> Service lainnya
            </p>
            <ArrowRight className="w-8 h-8 text-[#EE7D3B]" />
        </div>
        </div>

    </section>
  );
}
