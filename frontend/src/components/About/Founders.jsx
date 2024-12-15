import React from 'react';

const Founders = () => {
    const founders = [
        { 
            name: "Rangga Mukti Daniswara", 
            title: "Co-Founder, Chief Executive Officer", 
            image: "rangga-profile.jpg"
        },
        { 
            name: "Eldoni Mosul", 
            title: "Co-Founder, Chief Operating Officer", 
            image: "mosul-profile.jpg" 
        },
        { 
            name: "Amar Al Farizi", 
            title: "Co-Founder, Chief Product Officer", 
            image: "amar-profile.jpg" 
        },
        { 
            name: "Melly Anggraini", 
            title: "Co-Founder, Chief of Technology", 
            image: "melly-profile.jpg" 
        },
        { 
            name: "RA Siti Zakiyah", 
            title: "Co-Founder, Chief of Business", 
            image: "zakiyah-profile.jpg" 
        },
    ];

    return (
        <div>
            <div className="text-center flex justify-center items-center mb-4">
                <div className="bg-secondary-500 p-1 w-24 mb-4 mt-11"></div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-6">Berkenalan dengan Pendiri Kreatikode</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {founders.map((founder, index) => (
                    <div key={index} className="text-center">
                        <img 
                            src={founder.image} 
                            alt={founder.name} 
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4" 
                        />
                        <h3 className="text-lg font-bold">{founder.name}</h3>
                        <p className="text-gray-700">{founder.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Founders;
