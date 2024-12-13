import React from 'react'

const ClassBanner = () => {
    return (
        <div className="w-full bg-gray-200  py-16  ">
            <div className="max-w-full mx-auto py-8 p-4">
                <div className="flex flex-col md:flex-row items-center justify-around ">
                    <div className='w-full md:w-1/2 flex flex-col items-center md:items-start'>
                        <h1 className="text-3xl md:text-5xl font-bold text-color-text mb-4 text-center md:text-left">HTML Dasar</h1>
                        <p className="mb-4 text-base text-center md:text-left">Kelas ini cocok untuk kamu yang ingin mencoba atau ingin menjadi seorang Web Developer.</p>
                        <div className="flex items-center space-x-2 mb-2 justify-center md:justify-start">
                            <img src="logo-sertifikat.png" alt="Logo" className="h-4 w-4" />
                            <span className="text-base font-medium text-gray-700">Sertifikat</span>
                        </div>
                        <button className="bg-primary-500 text-color-text-2 p-3 px-5 rounded-md font-semibold">Mulai Kelas Ini</button>
                    </div>
                    <img
                        src="https://kodedasar.com/assets/static/html5.152f235.3217ee3f0a53be8ca5c1eff5da59fe4e.png"
                        alt="Class Image"
                        className="w-full md:w-[500px] h-auto rounded-lg mt-10 md:mt-0 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default ClassBanner
