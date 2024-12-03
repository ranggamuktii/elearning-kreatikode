import React from "react";

const SubMaterial = ({ topics }) => {
    return (
        <div className="border bg-white rounded-lg p-6 w-1/3 h-fit">
            <h2 className="font-semibold text-lg mb-4">Materi</h2>
            <ul className="space-y-2">
                {topics.map((topic, index) => (
                    <li key={index} className="bg-secondary-100 p-3 rounded-md hover:text-gray-800">
                        {index + 1}. {topic}
                    </li>
                ))}
            </ul>
            <button className="font-semibold text-lg mt-2 py-2 w-full text-white bg-primary-500 rounded-full hover:bg-secondary-500">Lihat Selengkapnya</button>
        </div>
    );
};

export default SubMaterial;
