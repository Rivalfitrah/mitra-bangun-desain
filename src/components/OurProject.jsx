"use client";
import Image from "next/image";
import { MapPin, Expand, Clock } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Projects 001",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    img: "/assets/compro/OurProject-image.png",
    location: "Location",
    area: "Area",
    time: "Time",
  },
  {
    id: 2,
    title: "Projects 001",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    img: "/assets/compro/OurProject-image.png",
    location: "Location",
    area: "Area",
    time: "Time",
  },
];

export default function ProjectsSection() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4">
        {/* Title
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
          Our <span className="text-[#EE7D3B]">Completed Projects</span>
        </h2> */}

        {/* Project Cards */}
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden grid md:grid-cols-2 items-center gap-6 ${
                index % 2 === 1 ? "md:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image (left or right depending on index) */}
              <div
                className={`relative h-64 md:h-full ${
                  index % 2 === 1 ? "order-2" : ""
                }`}
              >
                <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover p-3 rounded-4xl"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-[#2d3a74]">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2">{project.desc}</p>

                {/* Info List */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#EE7D3B] text-white p-2 rounded-full">
                      <MapPin size={18} />
                    </span>
                    <span className="text-[#2d3a74]">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#EE7D3B] text-white p-2 rounded-full">
                      <Expand size={18} />
                    </span>
                    <span className="text-[#2d3a74]">{project.area}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#EE7D3B] text-white p-2 rounded-full">
                      <Clock size={18} />
                    </span>
                    <span className="text-[#2d3a74]">{project.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button
        <div className="text-center mt-12">
          <button className="bg-[#EE7D3B] text-white px-6 py-3 rounded-md font-medium hover:bg-orange-400 transition">
            View All Project
          </button>
        </div> */}
      </div>
    </section>
  );
}
