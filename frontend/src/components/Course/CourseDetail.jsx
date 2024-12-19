import PropTypes from 'prop-types';
import { addProgress, getProgress } from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showWarningToast } from '../Utils/toastUtils';
import CompletionModal from '../Modal/modalComplated';

const CourseDetail = ({ materials = [], courseId, materialId, userDetails, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedMaterials, setCompletedMaterials] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userDetails.id) {
        return 0;
      }
      const response = await getProgress(courseId, userDetails.id);
      const data = response.data.data[0];
      setProgress(data);
      setCompletedMaterials(data.completedMaterials || []);
      setQuizCompleted(data.quizCompleted || false);
      const index = materials.findIndex((material) => material._id === materialId);
      if (data.quizCompleted) {
        setCurrentIndex(index);
      }
    };

    fetchProgress();
  }, [courseId, userDetails.id, materials.length]);

  useEffect(() => {
    const index = materials.findIndex((material) => material._id === materialId);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  }, [materialId, materials]);

  const handleNext = async () => {
    const materialId = materials[currentIndex]._id;

    if (completedMaterials.includes(materialId)) {
      if (currentIndex < materials.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (!quizCompleted) {
          navigate(`/course/${courseId}/quiz`);
        } else {
          setShowModal(true);
          return showWarningToast('Quiz is already completed!');
        }
      }
    } else {
      if (currentIndex < materials.length - 1) {
        await addProgress(courseId, materialId, userDetails.id);
        setCurrentIndex(currentIndex + 1);
      } else {
        if (!quizCompleted) {
          navigate(`/course/${courseId}/quiz`);
        } else {
          setShowModal(true);
          return showWarningToast('Quiz is already completed!');
        }
      }
    }
    window.scrollTo(0, 0);
  };

  console.log(showModal)

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!materials.length) {
    return <div>No materials available</div>;
  }

  const isLastMaterial = currentIndex === materials.length - 1;
  return (
    <section className="flex-1 p-4">
      {showModal && <CompletionModal skor={progress.quizScore} courseId={courseId} onClose={handleCloseModal} />}
      <h1 className="text-3xl font-bold mb-4">{materials[currentIndex].title}</h1>
      <article className="prose max-w-none mb-4">
        <div
          className="
            break-words overflow-x-auto w-full
            [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
            [&_code]:font-mono [&_code]:text-sm [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded
            [&_img]:max-w-full [&_img]:h-auto
            [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block [&_table]:my-4
            [&_td]:p-2 [&_td]:border [&_td]:border-gray-200
            [&_th]:p-2 [&_th]:border [&_th]:border-gray-200
            sm:[&_pre]:text-base sm:[&_code]:text-base
            md:[&_pre]:text-base md:[&_code]:text-base
          "
          dangerouslySetInnerHTML={{
            __html: materials[currentIndex].content,
          }}
        />
      </article>

      <div className="flex justify-between">
        <button onClick={handlePrevious} disabled={currentIndex === 0} className={`flex items-center gap-2 p-2 rounded-lg ${currentIndex === 0 ? 'bg-gray-300' : 'bg-primary-500'} text-white`}>
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
          <p>Sebelumnya</p>
        </button>

        <button onClick={handleNext} disabled={false} className="flex items-center gap-2 p-2 rounded-lg bg-primary-500 text-white">
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
