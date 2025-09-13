import React from "react";
import CanvasSignature from "./CanvasSignature";
import UploadSignature from "./UploadSignature";

function TandaTangan() {
  return (
    <>
      {/* Bagian Tanda Tangan */}
      <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-semibold text-[#243B83] mb-2">Tanda tangan saya</h2>
        <UploadSignature />
        <hr className="my-4" />
        <CanvasSignature />
      </div>
    </>
  );
}

export default TandaTangan;
