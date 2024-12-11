import { useEffect, useState } from 'react';
import Loading from '../Loader/Loading';
import Banner from './Banner';
import LogoSlider from './LogoSlider';
import CourseCard from './CourseCard';
import Benefit from './Benefit';
import CallToAction from './CallToAction';
import Testimoni from './Testimoni';
import Faq from './Faq';
import { fetchCourses } from '../../services/api';



function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses');
        console.log(err);
      } 
    };

    getCourses();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full space-y-10 sm:space-y-15">
            <Banner />
            <LogoSlider />
            <div className="flex flex-nowrap gap-2">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            <Benefit />
            <Testimoni />
            <CallToAction />
            <Faq />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
