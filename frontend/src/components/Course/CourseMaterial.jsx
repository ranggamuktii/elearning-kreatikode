import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getProgress } from '../../services/api';

const CourseMaterial = ({ materials, courseId, userDetails, isLoggedIn }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await getProgress(courseId, userDetails.id);
      if (!response) {
        return 0;
      }
      const data = response.data.data[0];
      setProgress(data);

      const completedMaterialIds = data.completedMaterials || [];
      const initialCheckedItems = materials.reduce((acc, material, index) => {
        acc[`item${index}`] = completedMaterialIds.includes(material._id);
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    };

    fetchProgress();
  }, [courseId]);

  const handleCheckboxChange = (event, material) => {
    window.location.href = `/course/${courseId}/materials/${material._id}`;
  };

  return (
    <div className="border rounded-lg p-6 w-full md:w-3/12 h-fit">
      <h1 className="text-xl font-bold mb-4">Materi Kelas</h1>
      <div className="space-y-2">
        {materials.map((material, index) => (
          <label key={material._id} className="flex justify-between items-center bg-secondary-100 py-3 px-5 rounded-md">
            <span className="text-base">{material.title}</span>
            <input type="checkbox" name={`item${index}`} onChange={(event) => handleCheckboxChange(event, material)} checked={checkedItems[`item${index}`] || false} className="form-checkbox rounded-md h-5 w-5 text-primary-500" />
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
