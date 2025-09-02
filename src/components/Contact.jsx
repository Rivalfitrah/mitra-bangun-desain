"use client";

export default function ContactSection() {
  return (
    <section className="py-12 px-6 md:px-30 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        <span className="text-[#EE7D3B]">Contact</span>{" "}
        <span className="text-[#2E3D7D]">Us</span>
      </h2>

      <form className="w-full mx-auto space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Ex. John"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Ex. Doe"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none placeholder-gray-300"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="62xxxxxxxxxx"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none placeholder-gray-300"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
            Subject
          </label>
          <input
            type="text"
            placeholder="Ex. John"
            className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none placeholder-gray-300"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[#2E3D7D] mb-1">
            Your Message
          </label>
          <textarea
            rows={5}
            placeholder="Enter Here ..."
            className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E3D7D] outline-none resize-none placeholder-gray-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#2E3D7D] text-white font-medium py-3 rounded-md hover:bg-blue-800 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
