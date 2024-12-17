import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getProgress } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CourseMaterial = ({ materials, courseId, userDetails, isLoggedIn }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await getProgress(courseId, userDetails.id);
      if (!response) {
        return;
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
    navigate(`/course/${courseId}/materials/${material._id}`);
  };

  return (
    <div className="
      w-full md:w-3/12 
      border rounded-xl p-6 
      md:sticky md:top-24 
      sm:relative 
      bg-white 
      z-10 
      max-h-[calc(100vh-6rem)] 
      overflow-y-auto 
      mb-4
    ">
      <h1 className="text-xl font-bold mb-4">Materi Kelas</h1>
      <div className="space-y-2">
        {materials.map((material, index) => {
          const isCompleted = checkedItems[`item${index}`] || false;
          return (
            <div 
              key={material._id} 
              className={`
                flex justify-between items-center 
                py-3 px-5 rounded-xl 
                cursor-pointer 
                h-16 
                ${isCompleted ? 'bg-secondary-100 text-gray-800' : 'bg-gray-100 text-gray-300'}
              `}
              onClick={() => navigate(`/course/${courseId}/materials/${material._id}`)}
            >
              <span className="
                text-base 
                line-clamp-2 
                flex-grow 
                pr-2 
                overflow-hidden 
                text-ellipsis
              ">
                {material.title}
              </span>
              <input 
                type="checkbox" 
                name={`item${index}`} 
                onChange={(event) => handleCheckboxChange(event, material)} 
                checked={isCompleted} 
                className="form-checkbox rounded-md h-5 w-5 text-primary-500 flex-shrink-0" 
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          );
        })}
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
  courseId: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default CourseMaterial;