import React from "react";

const Deskription = () => {
    return (
        <div className="bg-secondary-500 text-white flex flex-col lg:flex-row gap-6 py-16 mb-8 mt-20 rounded-bl-[100px]">
            <div className="mb-12 mx-8 lg:mx-14 text-center lg:text-left lg:w-2/3">
                <h1 className="text-4xl font-bold mb-4">Kreatikode</h1>
                <p className="max-w-2xl mx-auto lg:mx-0 text-base text-slate-200">Platform e-learning yang berdedikasi untuk menyediakan pendidikan pemrograman berkualitas secara gratis bagi semua orang. Kami percaya bahwa setiap individu memiliki potensi untuk mempelajari dan menguasai keterampilan pemrograman, terlepas dari latar belakang atau kendala finansial yang mereka hadapi. Dengan semangat ini, kami mendirikan Kreatikode sebagai solusi untuk mendemokratisasi pendidikan pemrograman dan memberdayakan lebih banyak orang untuk meraih peluang karir yang lebih baik di era digital.</p></div>
            <img src="kreatikode-benefit.jpg" alt="Class Image" className="ww-[300px] md:w-[400px] h-auto rounded-lg mx-8 lg:mx-14" />
        </div>
    )
}
``
export default Deskription
