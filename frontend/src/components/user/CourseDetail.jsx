import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../services/api';
import MaterialNavigator from '../../components/user/MaterialNavigator';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        setError('Failed to fetch course details');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  const handleStartLearning = () => {
    setCurrentMaterialIndex(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {currentMaterialIndex === null ? (
        <>
          <img src={course.thumbnail} alt={course.title} className="w-full h-60 object-cover mb-4" />
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-500 mb-4">{course.category}</p>
          <p className="mb-4">{course.description}</p>

          <h2 className="text-xl font-bold mt-4">Introduction</h2>
          <p>{course.introduction.overview}</p>

          <h2 className="text-xl font-bold mt-4">What Will You Learn</h2>
          <ul className="list-disc ml-4">
            {course.introduction.whatWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-4">Prerequisites</h2>
          <ul className="list-disc ml-4">
            {course.introduction.prerequisites.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Tombol "Belajar Sekarang" */}
          <button onClick={handleStartLearning} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Belajar Sekarang
          </button>
        </>
      ) : (
        <MaterialNavigator materials={course.materials} initialIndex={currentMaterialIndex} onExit={() => setCurrentMaterialIndex(null)} />
      )}
    </div>
  );
};

export default CourseDetail;
