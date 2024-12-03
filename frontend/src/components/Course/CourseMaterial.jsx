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
        <div className="border rounded-lg w-3/12 p-6 h-fit">
            <h1 className="text-xl font-bold mb-4">Materi Kelas</h1>
            <div className="space-y-2">
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 1</span>
                    <input
                        type="checkbox"
                        name="item1"
                        checked={checkedItems.item1}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500 "
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 2</span>
                    <input
                        type="checkbox"
                        name="item2"
                        checked={checkedItems.item2}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 3</span>
                    <input
                        type="checkbox"
                        name="item3"
                        checked={checkedItems.item3}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 4</span>
                    <input
                        type="checkbox"
                        name="item4"
                        checked={checkedItems.item4}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 5</span>
                    <input
                        type="checkbox"
                        name="item5"
                        checked={checkedItems.item5}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 6</span>
                    <input
                        type="checkbox"
                        name="item6"
                        checked={checkedItems.item6}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
                <label className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
                    <span className="text-base">Belajar Dasar HTML 7</span>
                    <input
                        type="checkbox"
                        name="item7"
                        checked={checkedItems.item7}
                        onChange={handleCheckboxChange}
                        className="form-checkbox rounded-md h-5 w-5 text-primary-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default CourseMaterial;