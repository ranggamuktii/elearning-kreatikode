import PropTypes from 'prop-types';
import { getProgress } from '../../services/api';
import { useEffect, useState } from 'react';
import { showWarningToast } from '../Utils/toastUtils';

const ClassBanner = ({ courses, userDetails, isLoggedIn }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const fetchProgress = async () => {
        const response = await getProgress(`${courses._id}`, userDetails.id);
        const data = response.data.data[0];
        setProgress(data)
      };
      
      fetchProgress();
    }, [courses._id, courses.materials.length]);
    
    const handleClick = () => {
      if (!isLoggedIn) {
        return showWarningToast('Please login to access this feature');
      }
  
      if (progress && progress.lastAccessedMaterial) {
        const lastAccessedIndex = courses.materials.findIndex(material => material._id === progress.lastAccessedMaterial);
        if (lastAccessedIndex !== -1 && lastAccessedIndex < courses.materials.length - 1) {
          window.location.href = `/course/${courses._id}/materials/${courses.materials[lastAccessedIndex + 1]._id}`;
        } else {
          window.location.href = `/course/${courses._id}/quiz`;
        }
      } else {
        window.location.href = `/course/${courses._id}/materials/${courses.materials[0]._id}`;
      }
    }

  return (
    <div className="w-full bg-gray-200 ">
      <div>
        <div className=" ml-10 mr-10 flex items-center justify-between space-x-4">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-color-text mb-4">{courses.title}</h1>

            <p className="mb-4 text-base">{courses.description}</p>
            <button onClick={handleClick} className="bg-primary-500 text-color-text-2 p-3 px-5 rounded-md font-semibold">Mulai Kelas Ini</button>
          </div>
          <img src={`${import.meta.env.VITE_API_URL}/thumbnail/${courses.thumbnail.split("\\").pop()}`} alt={courses.title} className="w-[500px] h-[300px] rounded-lg mt-20 mb-20" />
        </div>
      </div>
    </div>
  );
};

ClassBanner.propTypes = {
  courses: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

// ClassBanner.defaultProps = {
//   courses: {
//     title: '',
//     description: '',
//   },
// };

export default ClassBanner;
