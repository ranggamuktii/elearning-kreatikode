import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchProgress } from '../../services/api'

//course diambil dari home page user, lalu fetch course
const CourseCard = ({ course }) => {
  const [progress, setProgress] = useState(0);
  // buat userId tersimpan dilocalStorage, atau jadikan params
  const userId = localStorage.getItem('userId')
  
  console.log(userId)
  useEffect(() => {
    const getProgress = async () => {
      const response = await fetchProgress( userId, `${course._id}`);
      //cek respon
      // console.log(response)
      //jika data progress ada didalam object respon
      const data = response.data
      //cek data
      // console.log(data)
      //cek materials
      // console.log(course.materials)
      // console.log(data.completeMaterials)
      const totalMaterials = course.materials.length || 0;
      const completedMaterials = data.completeMaterials.length || 0;
      console.log(completedMaterials)
      if (totalMaterials > 0) {
        const percentage = (completedMaterials / totalMaterials) * 100;
        setProgress(percentage);
      }
    };

    getProgress();
  }, [course._id, userId]);

  return (
    <div className="border rounded-xl shadow-md overflow-hidden max-w-64 h-auto">
      <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-base">{course.title}</h3>
        <p className="text-gray-500 text-xs mb-3">{course.category}</p>
        <p className="mt-2 text-xs">{course.description.slice(0, 100)}</p>
        <div className='flex items-center gap-1 mt-3 -mb-1'>
          <div className="w-full h-2 bg-gray-200 border-2 rounded-xl border-current">
            <div className="bg-blue-600 rounded-xl p-1 h-full" style={{ width: `${progress}%` }}>
            </div>
          </div>
          <p className='text-xs'>{Math.round(progress)}%</p>
        </div>
        <button onClick={() => (window.location.href = `/course/${course._id}`)} className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Lihat Kelas
        </button>
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
};

export default CourseCard;