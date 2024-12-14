import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg text-center mx-4 overflow-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Selamat!</h2>
          <p className="text-gray-600 mb-6">
            Kamu telah berhasil menyelesaikan Kelas ini dan meraih:
          </p>
  
          {/* Card: SkilPoin */}
          <div className="bg-green-100 text-green-600 rounded-lg flex justify-between items-center p-4 mb-4">
            <span className="text-xl font-semibold">⭐ SkilPoin</span>
            <span className="text-2xl font-bold">+90</span>
          </div>
  
          {/* Card: Nilai */}
          <div className="bg-yellow-100 text-yellow-700 rounded-lg flex justify-between items-center p-4 mb-6">
            <span className="text-xl font-semibold">🎯 Nilai</span>
            <span className="text-2xl font-bold">A</span>
          </div>
  
          {/* Feedback Buttons */}
          <p className="text-gray-700 mb-3">
            Apakah kelas ini sesuai dengan ekspektasi kamu?
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Tidak Juga
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Sebagian
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ya
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Melebihi
            </button>
          </div>
  
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold"
          >
            Kirim Ulasan
          </button>
        </div>
      </div>
    )
  );
  
};

export default Modal;
