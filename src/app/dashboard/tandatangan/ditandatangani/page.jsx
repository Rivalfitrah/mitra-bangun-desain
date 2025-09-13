"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";
import { getAllDocuments } from '@/lib/api';

export default function Ditandatangani() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // data per halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllDocuments();
        if (res && res.success) {
          setData(res.data || []);
        } else {
          setData([]);
          setError(res?.error || 'Failed to load documents');
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError(error.message || 'Error fetching documents');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleClick = (id) => {
    router.push(`/dashboard/tandatangan/ditandatangani/detail/${id}`);
  };

  return (
    <div className="md:flex bg-white">
      {/* Sidebar */}
      <div className="fixed md:fixed md:top-0 md:left-0 md:h-full w-0 md:w-64 text-white shadow-lg z-40 transition-all duration-300">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-1 bg-white px-6 min-h-screen ml-0 md:ml-64">
        <div className="min-h-screen bg-white p-4 md:p-6">
          <HeaderDashboard />

          <h1 className="text-2xl font-bold text-[#243B83] mb-6">
            Dokumen Ditandatangani
          </h1>

          {/* Info Box */}
          <div className="bg-white border-l-4 border-[#243B83] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] mb-6">
            <h2 className="font-semibold text-[#243B83]">Informasi</h2>
            <p className="text-md text-gray-600 mt-1">
              Seluruh dokumen yang sudah diunggah ditampilkan pada halaman ini
            </p>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 border-[#243B83] border rounded-lg shadow-sm hover:bg-[#243B83] hover:text-white text-[#243B83]">
              Sortir
            </button>
          </div>

          {/* Tabel scrollable */}
          <div className="overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#243B83] text-white text-left">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nama Dokumen</th>
                  <th className="px-4 py-3">Tanggal Upload</th>
                  <th className="px-4 py-3">Uploader</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      Memuat dokumen...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      Tidak ada dokumen.
                    </td>
                  </tr>
                ) : (
                  currentData.map((doc, idx) => (
                    <tr key={doc.id} className="border-b text-[#243B83]">
                      <td className="px-4 py-2">{indexOfFirstItem + idx + 1}</td>
                      <td className="px-4 py-2">{doc.customId}</td>
                      <td className="px-4 py-2">{doc.title}</td>
                      <td className="px-4 py-2">{new Date(doc.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{doc.uploader?.profil?.nama || "-"}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`font-medium ${
                            doc.signers?.every((s) => s.status === "signed")
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {doc.signers?.every((s) => s.status === "signed")
                            ? "Approved"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => handleClick(doc.id)}
                          className="px-3 py-1 bg-white border border-[#243B83] text-[#243B83] rounded hover:bg-[#243B83] hover:text-white"
                        >
                          Detail
                        </button>
                        <a
                          href={doc.content}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-[#243B83] text-white rounded hover:bg-blue-500"
                        >
                          Download
                        </a>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-1 rounded 
                ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#243B83] font-medium"
                }`}
            >
              <ChevronLeft size={18} /> Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-[#243B83] text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-1 rounded 
                ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#243B83] font-medium"
                }`}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
