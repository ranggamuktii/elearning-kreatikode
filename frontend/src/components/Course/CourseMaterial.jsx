import PropTypes from 'prop-types';
import { useState } from 'react';

const CourseMaterial = ({ materials }) => {
  const [checkedItems, setCheckedItems] = useState(
    materials.reduce(
      (acc, _, index) => ({
        ...acc,
        [`item${index}`]: false,
      }),
      {}
    )
  );

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
        {materials.map((material, index) => (
          <label key={material._id} className="flex justify-between space-x-3 bg-secondary-100 py-3 px-5 rounded-md">
            <span className="text-base">{material.title}</span>
            <input type="checkbox" name={`item${index}`} checked={checkedItems[`item${index}`] || false} onChange={handleCheckboxChange} className="form-checkbox rounded-md h-5 w-5 text-primary-500" />
          </label>
        ))}
      </div>
    </div>
  );
};

CourseMaterial.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
export default CourseMaterial;
