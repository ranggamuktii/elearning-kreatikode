import React from "react";

const VisionMission = () => {
    return (
        <div>
            <div class="text-center flex justify-center items-center mb-4">
                <div class="bg-secondary-500 p-1 w-24 mb-10 mt-11"></div>
            </div>
            <div className="relative bg-secondary-100 rounded-lg p-6 mx-6 mb-12">
                <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white font-bold px-16 py-2 rounded-full text-3xl">Visi</h1>
                <div className="p-6 h-fit text-center text-black">
                    <section>
                        <p className="">Membangun platform e-learning terdepan yang menghapus hambatan dalam akses pendidikan pemrograman, menyediakan materi pembelajaran yang komprehensif dan berkualitas tinggi secara gratis. Dengan pendekatan inklusif, platform ini memberdayakan individu dari berbagai latar belakang untuk menguasai keterampilan teknologi yang relevan dengan kebutuhan industri modern.</p>
                    </section>
                </div>
            </div>
            <div className="relative bg-secondary-100 rounded-lg p-6 mx-6">
                <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white font-bold px-16 py-2 rounded-full text-3xl">Misi</h1>
                <section>
                    <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 text-black justify-items-center">
                        <li>Menyediakan kurikulum pembelajaran pemrograman yang terstruktur dan komprehensif, mulai dari tingkat pemula hingga tingkat lanjut, yang dapat diakses secara gratis oleh siapa saja.
                        </li>
                        <li>Menciptakan lingkungan belajar yang interaktif, menarik, dan mendukung perkembangan keterampilan pemrograman secara efektif melalui kombinasi materi tekstual, video, contoh kode, dan latihan praktis.
                        </li>
                        <li>Menghilangkan hambatan finansial dalam pendidikan pemrograman dengan menyediakan platform yang sepenuhnya gratis, sehingga semua orang memiliki kesempatan yang sama untuk belajar dan berkembang.
                        </li>
                        <li>Membangun komunitas pembelajar yang inklusif dan saling mendukung, di mana anggota dapat berbagi pengetahuan, berkolaborasi, dan saling menginspirasi dalam perjalanan belajar mereka.
                        </li>
                        <li>Terus berinovasi dan memperbarui materi pembelajaran agar selaras dengan perkembangan teknologi terkini, sehingga pengguna selalu mendapatkan keterampilan yang relevan dan siap untuk menghadapi tantangan industri.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default VisionMission
