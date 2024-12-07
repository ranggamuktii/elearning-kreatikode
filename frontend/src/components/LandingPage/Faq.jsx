import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

export function Faq() {
  const faqData = [
    {
      question: 'Apakah saya perlu membayar untuk mengakses materi pembelajaran di Kreatikode?',
      answer:
        'Tidak, semua materi pembelajaran di Kreatikode tersedia secara gratis. Kami percaya bahwa pendidikan harus dapat diakses oleh semua orang tanpa kendala finansial. Anda dapat menikmati seluruh konten pembelajaran kami tanpa dipungut biaya apapun.',
    },
    {
      question: 'Materi apa saja yang tersedia di Kreatikode dan apakah saya harus mempelajarinya secara berurutan?',
      answer:
        'Kreatikode menyediakan materi pemrograman yang komprehensif, mulai dari dasar-dasar HTML, CSS, dan JavaScript, hingga topik yang lebih lanjut seperti React dan Node.js. Kami menyarankan untuk mempelajari materi secara berurutan, terutama jika Anda baru memulai. Namun, jika Anda sudah memiliki pemahaman dasar, Anda dapat memilih materi yang sesuai dengan minat dan kebutuhan Anda. Tim kami terus mengembangkan dan menambahkan materi baru secara berkala untuk memastikan Anda mendapatkan pengetahuan yang relevan dan terkini.',
    },
    {
      question: 'Bagaimana cara saya mengetahui progres belajar saya dan apakah ada evaluasi dalam setiap modul pembelajaran?',
      answer:
        'Setelah login, Anda dapat mengakses dashboard akun Anda yang menampilkan progres belajar Anda secara detail. Di sana, Anda dapat melihat modul yang telah Anda selesaikan dan kuis yang telah Anda ikuti. Ya, setiap modul pembelajaran dilengkapi dengan kuis atau latihan soal di akhir modul untuk menguji pemahaman Anda. Meskipun opsional, kami sangat menyarankan untuk mengikuti kuis tersebut agar Anda dapat mengukur tingkat penguasaan materi dan mengidentifikasi area yang masih perlu ditingkatkan. Hasil kuis juga akan tercatat dalam progres belajar Anda.',
    },
    {
      question: 'Apakah saya harus mempelajari materi secara berurutan?',
      answer: 'Kami menyarankan untuk mempelajari materi secara berurutan, terutama jika Anda baru memulai. Namun, jika Anda sudah memiliki pemahaman dasar, Anda dapat memilih materi yang sesuai dengan kebutuhan dan minat Anda.',
    },
  ];

  return (
    <div className="py-16 px-4 md:px-6 w-full mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Pertanyaan yang Sering Ditanyakan</h2>
        <p className="text-gray-900">Semua yang perlu Anda ketahui tentang berkolaborasi dengan Kreatikode.</p>
      </div>

      <div className="flex items-center justify-center px-5 sm:px-20">
        <div className="w-full max-w-full">
          <Accordion collapseAll className="text-gray-800 border-none">
            {faqData.map((faq, index) => (
              <AccordionPanel key={index}>
                <AccordionTitle className="text-xs sm:text-[17px] text-gray-800 focus:text-primary-500 font-medium focus:font-semibold focus:ring-0 transition-all duration-300 py-8 bg-0 hover:bg-0 border-none focus:border-b-0">
                  {faq.question}
                </AccordionTitle>
                <AccordionContent className="transition-all duration-300 border-0">
                  <p className="mb-2 text-gray-500">{faq.answer}</p>
                </AccordionContent>
                <hr />
              </AccordionPanel>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faq;
