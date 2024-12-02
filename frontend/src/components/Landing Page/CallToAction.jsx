import React from "react";

const CallToAction = () => {
  const partners = [
    { id: 1, name: "Partner 1", image: "https://placehold.co/600x300" },
    { id: 2, name: "Partner 2", image: "https://placehold.co/600x300" },
    { id: 3, name: "Partner 3", image: "https://placehold.co/600x300" },
    { id: 4, name: "Partner 4", image: "https://placehold.co/600x300" },
    { id: 5, name: "Partner 5", image: "https://placehold.co/600x300" },
    { id: 6, name: "Partner 6", image: "https://placehold.co/600x300" },
    { id: 7, name: "Partner 7", image: "https://placehold.co/600x300" },
    { id: 8, name: "Partner 8", image: "https://placehold.co/600x300" },
    { id: 9, name: "Partner 9", image: "https://placehold.co/600x300" },
    { id: 10, name: "Partner 10", image: "https://placehold.co/600x300" },
    { id: 11, name: "Partner 11", image: "https://placehold.co/600x300" },
    { id: 12, name: "Partner 12", image: "https://placehold.co/600x300" }
  ];

  return (
    <section className="w-full bg-gray-200 p-8 md:p-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8">
        {/* Left Section */}
        <div className="md:col-span-4 space-y-6 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Tertarik untuk Berkolaborasi & Memberi Dampak Positif?
          </h2>
          <p className="text-gray-600">
            Lebih dari <span className="font-semibold">100+ perusahaan</span> telah bekerja sama dengan KreatiKode untuk membangun pendidikan yang lebih baik di Indonesia.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeNBkYEGmlQxfTcxCsrN3AeNw2KC5USDLECLwh6sjtYvJE_7g/viewform?usp=sf_link" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white px-8 py-3 rounded-xl text-gray-800 font-medium hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              Gabung Jadi Partner KreatiKode
            </button>
          </a>
        </div>

        {/* Right Section */}
        <div className="md:col-span-8">
          <div className="grid grid-cols-4 gap-4 grid-rows-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="aspect-video w-full h-full flex items-center justify-center bg-white p-4">
                  <img
                    src={partner.image}
                    alt={`Logo ${partner.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
