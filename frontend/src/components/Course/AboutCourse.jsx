import React from 'react'

const AboutCourse = () => {
    return (
        <div className="container w-2/3 mb-6">
            <div className="border bg-white rounded-lg p-6 mb-6 h-fit">
                <section>
                    <h2 className="font-bold text-xl mb-2">Tentang Kelas</h2>
                    <p className="mb-5">Di kelas ini, kita akan belajar bagaimana membuat sebuah website dari awal dengan menggunakan HTML. Dengan HTML, kita bisa membuat struktur dan kerangka sebuah website yang terdiri dari beberapa element. HTML juga berfungsi sebagai penampil konten pada website kita.</p>
                    <h3 className="text-lg font-bold mb-5">Apa yang akan kita pelajari?</h3>
                    <ul className="list-disc pl-5 mb-5">
                        <li>Struktur Dokumen HTML</li>
                        <li>HTML Element, Tag, Attribute & Comment</li>
                        <li>HTML Tag Untuk Menampilkan Teks</li>
                        <li>HTML Tag Untuk Multimedia</li>
                        <li>HTML Tag Untuk Tabel</li>
                        <li>HTML Tag Untuk Formulir</li>
                        <li>HTML Tag Untuk Membagi Layout Website</li>
                    </ul>
                </section>
            </div>
            <div className="border bg-white rounded-lg p-6 h-fit">
                <section>
                    <h2 className="font-bold text-xl mb-2">Persiapan Kelas</h2>
                    <ul className="list-disc pl-5 mb-5">
                        <li>Gunakan komputer atau laptop dengan koneksi internet yang stabil.</li>
                        <li>Install browser (disarankan menggunakan Chrome).</li>
                        <li>Jika kamu belum pernah mempelajari programming sebelumnya, tidak masalah.</li>
                    </ul>
                </section>
            </div>
        </div>

    )
}

export default AboutCourse
