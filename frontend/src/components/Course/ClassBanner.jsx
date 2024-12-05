import React from 'react'

const ClassBanner = () => {
    return (
        <div className="w-full bg-gray-200 ">
            <div class="">
                <div className=" ml-10 mr-10 flex items-center justify-between space-x-4">
                    <div className='w-1/2'>
                        <h1 className="text-5xl font-bold text-color-text mb-4">HTML Dasar</h1>
                        <p className="mb-4 text-base">Kelas ini cocok untuk kamu yang ingin mencoba atau ingin menjadi seorang Web Developer.</p>
                        <div className="flex items-center space-x-2 mb-2">
                            <img src="logo-sertifikat.png" alt="Logo" className="h-4 w-4" />
                            <span className="text-base font-medium text-gray-700">Sertifikat</span>
                        </div>
                        <button className="bg-primary-500 text-color-text-2 p-3 px-5 rounded-md font-semibold">Mulai Kelas Ini</button>
                    </div>
                    <img
                        src="HTML.png"
                        alt="Class Image"
                        className="w-[500px] h-[300px] rounded-lg mt-20 mb-20"
                    />
                </div>
            </div>
        </div>
    )
}

export default ClassBanner
