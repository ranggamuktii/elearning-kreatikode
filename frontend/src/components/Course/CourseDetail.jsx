import React from 'react';

const CourseDetail = () => {
    return (
        <section className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4">Belajar Dasar HTML</h1>
            <article>
                <h2 className="text-xl font-semibold mb-2">Apa itu HTML?</h2>
                <p className="mb-4">
                    Berikut ini merupakan Video Materi dari Trainer untuk "Pengenalan HTML."
                </p>
                <p className="mb-4">
                    HTML merupakan singkatan dari Hyper Text Markup Language. HTML adalah sebuah bahasa standar untuk pembuatan halaman web. Dengan adanya HTML, kita dapat membedakan struktur yang tersusun dari sebuah halaman melalui tag atau elemen-elemen penyusunnya.
                </p>
                <p className="mb-4">
                    Elemen atau tag pada HTML dikenali oleh browser seperti Google Chrome, Firefox, atau MS Edge, dll. Browser tersebut mengidentifikasi setiap elemen penyusun HTML dan ditampilkan sesuai karakteristik elemen tersebut. Contohnya sebuah elemen paragraf akan ditampilkan sebagai tulisan panjang, atau sebuah elemen pranala/link akan dicetak dengan warna biru dan ketika mouse mendekat kursornya berubah menjadi telunjuk, dsb.
                </p>
                <p className="mb-4">
                    Contoh sebuah struktur HTML sederhana:
                </p>
                <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                    {`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>`}
                </pre>
                <p>
                    Dari contoh struktur HTML sederhana di atas kita dapat mengidentifikasi beberapa hal seperti berikut.
                </p>
                <ul>
                    <li>{`<!DOCTYPE html>`} mengartikan bahwa dokumen ditulis dengan versi HTML5</li>
                    <li>{`<html>`} adalah elemen induk atau elemen utama yang sering disebut juga root element dari sebuah halaman HTML.</li>
                    <li>{`<head>`} berisi informasi tentang halaman HTML yang sedang dibuat</li>
                    <li>{`<title>`} adalah judul dari halaman HTML yang akan tampil di tab browser.</li>
                </ul>
            </article>
        </section>
    );
};

export default CourseDetail;
