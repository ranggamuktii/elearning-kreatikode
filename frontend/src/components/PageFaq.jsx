import { useState } from 'react';
import faqData from '../data/faqData';

function PageFaq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQ = faqData.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="flex flex-col justify-center w-full mx-auto px-4 md:px-6 pt-20 sm:pt-28">
        <div className="bg-gray-200 w-full aspect-[1600/300] sm:aspect-[1600/300] overflow-hidden flex justify-center items-center rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
          <img src="./faq-banner.jpg" alt="Banner Faq" className="block w-full h-full object-cover object-center" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-5 px-4 md:px-6 mx-auto mt-5 sm:mt-8">
        <div className="w-full lg:w-[1000px] flex flex-col space-y-4 sm:space-y-5 justify-center items-center">
          <h1 className="text-center text-primary-500 text-xl sm:text-2xl md:text-3xl font-semibold">Kamu punya pertanyaan?</h1>
          <p className="text-center text-sm leading-5 sm:leading-6 md:text-base md:leading-7">
            Ada yang ingin kamu tanyakan tentang kami? Cek dulu daftar pertanyaan yang sering diajukan user-user kami yang sudah kami buat secara komprehesif untuk memberikan jawaban yang kamu butuhkan yuk!
          </p>

          {/* Search Input */}
          <div className="w-full sm:w-[500px]">
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pl-10 text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-2xl focus:ring-primary-500 focus:border-primary-500"
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="w-full sm:max-w-[1000px]" id="accordion-flush">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((faq) => (
              <div key={faq.id} className="py-2">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-3 sm:py-5 font-medium text-sm sm:text-base text-start text-gray-800 border-b border-gray-200 gap-3"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={openIndex === faq.id}
                    aria-controls={`accordion-flush-body-${faq.id}`}
                  >
                    <span className={`text-sm sm:text-base ${openIndex === faq.id ? 'text-primary-500' : ''}`}>{faq.question}</span>
                    <svg className={`w-3 h-3 flex-shrink-0 transform transition-transform duration-300 ${openIndex === faq.id ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                    </svg>
                  </button>
                </h2>
                <div id={`accordion-flush-body-${faq.id}`} className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div
                    className="py-5 text-xs sm:text-sm border-b text-gray-600 border-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: faq.answer,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada pertanyaan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageFaq;
