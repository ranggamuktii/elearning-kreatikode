import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseMaterial from '../components/Course/CourseMaterial';
import CourseDetail from '../components/Course/CourseDetail';
import ContactAdmin from '../components/Course/ContactAdmin';
import { fetchCourseById } from '../services/api';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';

const MateriPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { courseId, materialId } = useParams();

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      setIsLoggedIn(true);
      const decoded = decodeJwt(token);
      setUserDetails(decoded);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
    <div className="mt-24">
      <ContactAdmin />
      <div className="flex flex-col md:flex-row flex-1 m-4 gap-8">
        <CourseMaterial materials={course?.materials} courseId={courseId} userDetails={userDetails} isLoggedIn={isLoggedIn} />
        <CourseDetail materials={course?.materials} courseId={courseId} materialId={materialId} userDetails={userDetails} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default MateriPage;
