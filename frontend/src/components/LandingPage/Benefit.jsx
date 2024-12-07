import { VscWorkspaceTrusted } from 'react-icons/vsc';

const Benefit = () => {
  return (
    <div className="bg-primary-500 py-10 sm:py-20 px-6 sm:px-20 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">Ingin memulai perjalanan belajar coding dan menguasai teknologi terkini?</h1>
        <p className="mt-4 text-white">Dengan KreatiKode, Anda bisa belajar coding dari dasar hingga mahir bersama mentor berpengalaman dan materi berkualitas</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-10 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="https://placehold.co/500x300/png" alt="Benefit" className="w-3/4 md:w-full object-cover rounded-xl shadow-md" />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-primary flex-shrink-0">
              <VscWorkspaceTrusted className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Belajar dari Nol</h3>
              <p className="text-white">Kami menyediakan kursus yang dirancang khusus untuk pemula hingga tingkat lanjutan, lengkap dengan materi terkini yang praktis dan mudah dipahami.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-primary flex-shrink-0">
              <VscWorkspaceTrusted className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Akses Materi Selamanya</h3>
              <p className="text-white">Dengan KreatiKode Anda bisa mengakses materi selamanya tanpa belajar dengan buru-buru.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 ">
            <div className="text-primary flex-shrink-0">
              <VscWorkspaceTrusted className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Belajar Tanpa Ribet</h3>
              <p className="text-white">KreatiKode menyediakan berbagai fitur dan keunggulan yang membuat proses belajar menjadi lebih mudah dan efektif.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
