import React, { useState } from 'react';

const CourseMaterial = () => {
    const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
        item6: false,
        item7: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    return (
        <div className="border rounded-lg p-6 w-full md:w-3/12 h-fit">
            <h1 className="text-xl font-bold mb-4">Materi Kelas</h1>
            <div className="space-y-2">
                {Object.keys(checkedItems).map((item, index) => (
                    <label
                        key={item}
                        className="flex justify-between items-center bg-secondary-100 py-3 px-5 rounded-md"
                    >
                        <span className="text-base">Belajar Dasar HTML {index + 1}</span>
                        <input
                            type="checkbox"
                            name={item}
                            checked={checkedItems[item]}
                            onChange={handleCheckboxChange}
                            className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CourseMaterial;
