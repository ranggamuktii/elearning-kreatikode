import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../services/api';
import { fetchCourses, loadComment } from '../services/api';
import { showErrorToast } from '../components/Utils/toastUtils';
import SubMaterial from '../components/Course/SubMaterial.';
import AboutCourse from '../components/Course/AboutCourse';
import ReviewCourse from '../components/Course/ReviewCourse';
import ClassBanner from '../components/Course/ClassBanner';
import CourseCard from '../components/LandingPage/CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';

const CourseDetail = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

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

  useEffect(() => {
    loadComment(courseId)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [courseId]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();
        setCourses(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        showErrorToast('Gagal memuat data kelas');
        setLoading(false);
        console.error(err);
      }
    };

    getCourses();
  }, []);

  const handleViewAll = () => {
    navigate('/course');
  };

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
      <ClassBanner courses={course} userDetails={userDetails} isLoggedIn={isLoggedIn} />
      <div className="max-w-full mx-auto px-4 mt-8 flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <AboutCourse courses={course} />
            <SubMaterial courses={course?.materials} className="w-full md:w-1/2" />
          </div>
        </div>
        <section className="border bg-white rounded-lg p-6 md:ml-6 mb-8 w-full md:w-2/3">
          <h2 className="font-semibold text-xl mb-4">Ulasan</h2>
          <ReviewCourse reviews={comments} userDetails={userDetails} />
        </section>
        <section className="w-full">
          <div className="flex justify-between items-center px-6 py-4 sm:px-10 sm:py-6">
            <h1 className="text-center sm:text-start text-lg sm:text-2xl font-semibold">Rekomendasi Kelas Untuk Kamu</h1>
            <button onClick={handleViewAll} className="hidden sm:flex items-center gap-2 text-primary-500 transition-colors">
              <span>Lihat Semua</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 sm:px-10">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} className="h-full" />
            ))}
          </div>
          <div className="sm:hidden px-0  overflow-hidden">
            <div className="pl-0">
              <Swiper slidesPerView="auto" className="w-full !overflow-visible" spaceBetween={-40} slidesOffsetAfter={40}>
                {courses.map((course) => (
                  <SwiperSlide key={course._id} style={{ width: '330px' }} className="!h-auto">
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <button onClick={handleViewAll} className="w-full flex sm:hidden justify-center items-center p-2 mt-4 rounded-xl border hover:bg-primary-100">
            <span className="font-medium text-primary-500">Lihat Semua</span>
            <svg className="w-5 h-5 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;
