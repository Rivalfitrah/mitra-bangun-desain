"use client";
import { useState } from "react";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { id: 1, question: "Lorem ipsum dolor sit amet", answer: "Jawaban detail untuk FAQ pertama. Bisa diisi dengan informasi yang lebih lengkap." },
  { id: 2, question: "Lorem ipsum dolor sit amet", answer: "Jawaban detail untuk FAQ kedua." },
  { id: 3, question: "Lorem ipsum dolor sit amet", answer: "Jawaban detail untuk FAQ ketiga." },
  { id: 4, question: "Lorem ipsum dolor sit amet", answer: "Jawaban detail untuk FAQ keempat." },
  { id: 5, question: "Lorem ipsum dolor sit amet", answer: "Jawaban detail untuk FAQ kelima." },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-30">
      <div className="w-full mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12 text-[#EE7D3B]" >
                Frequently<br />
          <span className="text-[#2d3a74]">Asked Questions</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* FAQ List */}
          <div className="md:col-span-2 space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border rounded-xl shadow-sm overflow-hidden p-2"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-[#2d3a74] font-medium"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-[#2d3a74] transform transition-transform ${
                      open === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === faq.id && (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, marginTop: 0 }}
                      animate={{ opacity: 1, marginTop: 8 }}
                      exit={{ opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="px-4 pb-3 text-gray-600 text-sm md:text-base"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            {/* Box 1 */}
            <div className="bg-[#2d3a74] text-white rounded-xl p-6 text-center">
              <MessageCircle className="w-10 h-10 mx-auto" />
              <h2 className="font-bold text-lg lg:text-2xl mt-4">
                You have different questions
              </h2>
              <p className="text-sm md:text-base my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
              <button className="bg-white text-[#2d3a74] px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition">
                Contact Us
              </button>
            </div>

            {/* Box 2 */}
            <div className="border shadow-sm rounded-xl p-6 flex items-start gap-4">
              <Phone className="w-8 h-8 text-[#EE7D3B]" />
              <div>
                <h4 className="text-[#EE7D3B] font-semibold">24/7 Service</h4>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
