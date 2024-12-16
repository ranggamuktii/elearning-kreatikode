import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubMaterial from '../components/Course/SubMaterial.';
import AboutCourse from '../components/Course/AboutCourse';
import ReviewCourse from '../components/Course/ReviewCourse';
import ClassBanner from '../components/Course/ClassBanner';
import { loadComment } from '../services/api';
import { fetchCourseById } from '../services/api';

const CourseDetail = () => {
  const [comments, setComments] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const response = await fetchCourseById(courseId);
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  useEffect(() => {
    loadComment(courseId)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [courseId]);

  if (loading) {
    return <div className="container w-2/3 mb-6">Loading...</div>;
  }

  if (error) {
    return <div className="container w-2/3 mb-6 text-red-500">Error: {error}</div>;
  }

  if (!course) {
    return <div className="container w-2/3 mb-6">Course not found</div>;
  }

  return (
    <div>
      <ClassBanner courses={course} />
      <div className="max-w-full mx-auto px-8 mt-8">
        <div className="flex gap-6">
          <AboutCourse courses={course} />
          <SubMaterial courses={course?.materials} />
        </div>
        <section className="border bg-white rounded-lg p-6 mb-8 h-fit w-[888px]">
          <h2 className="font-bold text-xl mb-4">Ulasan</h2>
          <ReviewCourse reviews={comments} />
        </section>
        <section className="mt-8">
          <h2 className="font-bold text-xl mb-4">Rekomendasi Kelas Untuk Kamu</h2>
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;
