const CallToAction = () => {
  const partners = [
    { id: 1, name: 'Partner 1', image: './itera.png' },
    { id: 2, name: 'Partner 2', image: './amikom.png' },
    { id: 3, name: 'Partner 3', image: './unsika.png' },
    { id: 4, name: 'Partner 4', image: './unisbank.png' },
    { id: 5, name: 'Partner 5', image: './kominfo.png' },
    { id: 6, name: 'Partner 6', image: './vocasia.png', className: 'max-h-8' },
    { id: 7, name: 'Partner 7', image: './kemendikbud.png' },
    { id: 8, name: 'Partner 8', image: './kampus-merdeka.png', className: 'max-h-7 sm:max-h-12' },
    { id: 9, name: 'Partner 9', image: './msib.png', className: 'max-h-16' },
    { id: 10, name: 'Partner 10', image: './bnsp.png', className: 'max-h-6 sm:max-h-12' },
    { id: 11, name: 'Partner 11', image: './google-developer.png', className: 'max-h-6 sm:max-h-12' },
    { id: 12, name: 'Partner 12', image: './digitalent.png' },
  ];

  return (
    <div className="flex items-center justify-center px-4 sm:px-12">
      <div className="rounded-3xl bg-primary-500 p-6 md:p-12">
        <div className="max-w-7xl mx-auto text-center md:text-center lg:text-left md:grid-cols-none lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Section */}
          <div className="md:col-span-4 space-y-3 sm:space-y-5 mt-0 sm:mt-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">Tertarik untuk Berkolaborasi & Memberi Dampak Positif?</h2>
            <p className="text-white text-sm sm:text-base">
              Lebih dari <span className="font-semibold">100+ perusahaan</span> telah bekerja sama dengan KreatiKode untuk membangun pendidikan yang lebih baik di Indonesia.
            </p>
            <div>
              <a href="https://forms.gle/JwGqeCnQJSNfYrC29" target="_blank" rel="noopener noreferrer">
                <button className="text-sm sm:text-base bg-white px-7 py-2 sm:px-8 sm:py-2 mb-8 md:mb-10 rounded-xl text-primary-500 font-medium hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                  Gabung Jadi Partner KreatiKode
                </button>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 grid-rows-3">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-custom-mild hover:shadow-primary-100">
                  <div className="aspect-video w-full h-full flex items-center justify-center bg-white p-2 sm:p-5">
                    <img src={partner.image} alt={`Logo ${partner.name}`} className={`w-full h-full object-contain ${partner.className}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
