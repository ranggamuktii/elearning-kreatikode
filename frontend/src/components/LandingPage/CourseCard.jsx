import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getProgress } from '../../services/api'

const CourseCard = ({ course }) => {
  const [progress, setProgress] = useState(0);
  
 

  //sesuaiin sama get progress
  useEffect(() => {
    const fetchProgress = async () => {
      const response = await getProgress( `${course._id}`);
      const data = response.data.data[0]
      console.log (data)
      
      const totalMaterials = course.materials.length || 0;
      const completedMaterials = data.completedMaterials.length || 0;
      if (totalMaterials > 0) {
        const percentage = (completedMaterials / totalMaterials) * 100;
        setProgress(percentage);
      }
    };

    fetchProgress();
  }, [course._id]);

  return (
    <div className="border rounded-xl shadow-md overflow-hidden w-64 h-auto flex flex-col">
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base">{course.title}</h3>
        <p className="text-gray-500 text-xs mb-3">{course.category}</p>
        <p className="mt-2 text-xs mb-3 flex-grow">{course.description.slice(0, 100)}..</p>
  
        <div className='flex items-center gap-1 mt-1 '>
          <div className="w-full h-2 bg-gray-200 border-2 rounded-xl border-current flex-grow">
            <div className="bg-blue-600 rounded-xl h-full" style={{ width: `${progress}%` }}>
            </div>
          </div>
          <p className='text-xs'>{Math.round(progress)}%</p>
        </div>
  
        <div className="mt-auto"> 
          <button onClick={() => (window.location.href = `/course/${course._id}`)} className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Lihat Kelas
          </button>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  // userId: PropTypes.string.isRequired, 
};

export default CourseCard;