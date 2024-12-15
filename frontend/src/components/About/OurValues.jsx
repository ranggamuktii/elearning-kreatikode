import React from 'react';

const OurValues = () => {
    const points = [
        { 
            title: "Inclusivity", 
            desc: "Pendidikan pemrograman adalah hak bagi semua orang, tanpa memandang usia, jenis kelamin, latar belakang, atau status ekonomi. Komitmen diberikan untuk menciptakan platform yang ramah dan dapat diakses oleh berbagai kalangan.", 
            image: "value-inclusivity.png" 
        },
        { 
            title: "Quality", 
            desc: "Platform ini mengutamakan kualitas dalam setiap aspeknya. Para ahli di bidang pengembangan web dan pendidikan teknologi bekerja keras untuk menyajikan materi pembelajaran yang jelas, sederhana, dan sesuai dengan standar industri.", 
            image: "value-quality.png" 
        },
        { 
            title: "Innovation", 
            desc: "Inovasi dan adaptasi terhadap perkembangan teknologi terbaru menjadi prioritas dalam pengembangan materi pembelajaran. Dengan mengikuti tren dan praktik terbaik di industri, pengguna diberikan keterampilan yang relevan dan siap menghadapi tantangan dunia kerja.", 
            image: "value-innovation.png" 
        },
        { 
            title: "Collaboration", 
            desc: "Kolaborasi dipercaya sebagai kunci untuk pertumbuhan yang lebih baik. Interaksi, diskusi, dan berbagi pengetahuan di antara anggota komunitas didorong agar setiap individu dapat belajar dari satu sama lain dan berkembang bersama.", 
            image: "value-collaboration.png" 
        },
        { 
            title: "Social Impact", 
            desc: "Tujuan utama adalah memberikan dampak positif bagi masyarakat melalui pendidikan pemrograman. Dengan memberikan keterampilan yang relevan, individu diharapkan mendapat lebih banyak peluang kerja, meningkatkan kualitas hidup, dan mendorong inovasi teknologi yang berguna bagi banyak orang.", 
            image: "value-social-impact.png" 
        },
    ];

    const backgroundColors = [
        "bg-red-100",
        "bg-yellow-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
    ];

    const textColors = [
        "text-red-500",
        "text-yellow-500",
        "text-blue-500",
        "text-green-500",
        "text-purple-500",
    ];

    return (
        <div className="py-6">
            <div className="text-center flex justify-center items-center">
                <div className="bg-secondary-500 p-1 w-24 mt-16 mb-6"></div>
            </div>
            <h2 className="text-3xl font-bold text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {points.map((point, index) => (
                    <div
                        key={index}
                        className={`${backgroundColors[index % backgroundColors.length]} rounded-lg p-6 flex flex-col items-center text-center`}
                    >
                        <img 
                            src={point.image} 
                            alt={point.title} 
                            className= "w-20 h-20 object-cover rounded-full mb-2"
                        />
                        <h3 className={`text-lg font-semibold ${textColors[index % textColors.length]}`}>
                            {point.title}
                        </h3>
                        <p className="mt-2 text-black">{point.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurValues;
