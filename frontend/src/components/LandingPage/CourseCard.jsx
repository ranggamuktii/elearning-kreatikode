import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { useEffect, useState } from 'react';
import { getProgress } from '../../services/api';

const CourseCard = ({ course, progressFilter = false }) => {
  const [progress, setProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  let userDetails = {};

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      setIsLoggedIn(true);
      userDetails = decodeJwt(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userDetails.id) {
        return;
      }
      try {
        const response = await getProgress(`${course._id}`, userDetails.id);
        const data = response.data.data[0];

        const totalMaterials = course.materials.length || 0;
        const completedMaterials = data?.completedMaterials?.length || 0;
        if (totalMaterials > 0) {
          const percentage = (completedMaterials / totalMaterials) * 100;
          setProgress(percentage);

          // Kalau ini adalah card untuk "Kelas Saya", sembunyiin kalo engga ada progress
          if (progressFilter && percentage === 0) {
            setShouldRender(false);
          }
        }
      } catch (error) {
        if (progressFilter) {
          setShouldRender(false);
          console.error(error);
        }
      }
    };

    fetchProgress();
  }, [userDetails.id, course._id, course.materials.length, progressFilter]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div onClick={() => (window.location.href = `/course/${course._id}`)} className="w-[250px] sm:w-[330px] cursor-pointer hover:scale-97 transition-transform duration-500">
        <div className="border rounded-3xl shadow-custom-light overflow-hidden h-auto">
          <div className="relative pb-[56.25%] ">
            <img src={`${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail.split('\\').pop()}`} alt={course.title} className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
          <div className="bg-white p-4 flex flex-col h-full">
            <h3 className="font-semibold text-base sm:text-xl mb-1">{course.title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-3">{course.category}</p>
            <p className="mt-auto text-xs sm:text-sm line-clamp-1">{course.description}...</p>
            <div className="flex justify-beetwen items-center space-x-1 sm:space-x-2 mt-3">
              <div className="w-full flex justify-center items-center py-2 px-2 sm:px-3 bg-primary-100 bg-opacity-50 rounded-xl space-x-1 sm:space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-xs sm:text-sm text-primary-500 font-medium">{course.materials.length} material</p>
              </div>
              <div className="w-full flex justify-center items-center py-2 px-2 sm:px-3 bg-primary-100 bg-opacity-50 rounded-xl space-x-1 sm:space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>

                <p className="text-xs sm:text-sm text-primary-500 font-medium">{course.level}</p>
              </div>
            </div>
            <hr className="mt-4 mb-0" />

            {isLoggedIn && (
              <div className="flex items-center gap-1 mt-3 -mb-1">
                <div className="w-full h-2 bg-gray-200 border-0 rounded-xl border-current">
                  <div className="bg-primary-500 rounded-xl p-1 h-full text-xs sm:text-sm" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs xs:text-sm sm:text-base">{Math.round(progress)}%</p>
              </div>
            )}

            {/* {isLoggedIn && ( */}
              <button onClick={() => (window.location.href = `/course/${course._id}`)} className="w-full mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl text-xs xs:text-sm sm:text-base">
                Selengkapnya
              </button>
            {/* )} */}
          </div>
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
    materials: PropTypes.array.isRequired,
    level: PropTypes.string.isRequired,
  }).isRequired,
  progressFilter: PropTypes.bool,
};

export default CourseCard;
