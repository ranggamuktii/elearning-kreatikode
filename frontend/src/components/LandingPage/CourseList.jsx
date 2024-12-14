import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
import { fetchCourses } from '../../services/api';
import { showErrorToast } from '../Utils/toastUtils';
import CourseCard from './CourseCard';
import Loading from '../../components/Loader/Loading';

function CourseList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();
        setCourses(data.slice(0, 4));
        setIsLoading(false);
      } catch (err) {
        showErrorToast('Gagal memuat data kelas');
        setIsLoading(false);
        console.error(err);
      }
    };

    getCourses();
  }, []);


  const handleViewAll = () => {
    navigate('/course');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col">
      {/* Judul Mobile */}
      <h1 className="sm:hidden block text-2xl font-semibold mb-6 text-center">Kelas Unggulan</h1>

      {/* Header Desktop  */}
      <div className="sm:flex hidden justify-between items-center px-6 py-4 sm:px-20 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Kelas Unggulan</h1>
        <button onClick={handleViewAll} className="flex items-center gap-2 text-primary-500 transition-colors">
          <span>Lihat Semua</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Swiper */}
      <div className="sm:hidden px-6 -mx-6 overflow-visible">
        <div className="pl-6">
          <Swiper slidesPerView="auto" className="w-full !overflow-visible" spaceBetween={-40} slidesOffsetAfter={40}>
            {courses.map((course) => (
              <SwiperSlide key={course._id} style={{ width: '330px' }} className="!h-auto">
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 sm:px-20">
        {courses.map((course) => (
          <div key={course._id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Mobile View Button Lihat Semua */}
      <button onClick={handleViewAll} className="flex sm:hidden justify-center items-center gap-2 mx-6 p-2 mt-4 rounded-xl border hover:bg-primary-100">
        <span className="font-medium text-primary-500">Lihat Semua</span>
        <svg className="w-5 h-5 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default CourseList;
