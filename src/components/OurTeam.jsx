"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const team = [
  {
    id: 1,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 2,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 3,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 4,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 5,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 6,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 7,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 8,
    name: "Lorem ipsum dolor",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
  {
    id: 9,
    name: "Member Baru",
    role: "Lorem ipsum dolor",
    image: "/assets/compro/team1.jpg",
  },
];

export default function OurTeam() {
  const useSlider = team.length > 8;

  return (
    <section className="bg-white py-16 px-6 md:px-30">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-[#2d3a74]">
        Meet <span className="text-red-500">Our Team</span>
      </h2>

      {useSlider ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {team.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden m-5 md:mb-15">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-72"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-black">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="object-cover w-full h-72"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
