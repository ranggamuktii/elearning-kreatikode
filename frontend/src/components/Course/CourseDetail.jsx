import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { addProgress } from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDetail = ({ materials = [], courseId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      setIsLoggedIn(true);
      const a = decodeJwt(token);
      setUserDetails(a)
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleNext = async () => {
    const materialId = materials[currentIndex]._id;

    if (currentIndex < materials.length - 1) {
      await addProgress(courseId, materialId, userDetails.id);
      setCurrentIndex(currentIndex + 1);
    } else {
      // If we're at the last material, navigate to quiz
      navigate(`/course/${courseId}/quiz`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!materials.length) {
    return <div>No materials available</div>;
  }

  const isLastMaterial = currentIndex === materials.length - 1;

  return (
    <section className="flex-1 p-4">
      <h1 className="text-3xl font-bold mb-4">{materials[currentIndex].title}</h1>
      <article className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: materials[currentIndex].content }} />

      <div className="flex justify-between">
        <button onClick={handlePrevious} disabled={currentIndex === 0} className={`flex items-center gap-2 p-2 rounded-lg ${currentIndex === 0 ? 'bg-gray-300' : 'bg-primary-500'} text-white`}>
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
          <p>Sebelumnya</p>
        </button>

        <button onClick={handleNext} className="flex items-center gap-2 p-2 rounded-lg bg-primary-500 text-white">
          <p>{isLastMaterial ? 'Mulai Quiz' : 'Selanjutnya'}</p>
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Materi {currentIndex + 1} dari {materials.length}
      </div>
    </section>
  );
};

CourseDetail.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  courseId: PropTypes.string.isRequired,
};

export default CourseDetail;
