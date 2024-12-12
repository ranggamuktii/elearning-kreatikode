import { useEffect, useState } from 'react';
import Loading from '../Loader/Loading';
import Banner from './Banner';
import LogoSlider from './LogoSlider';
import CourseCard from './CourseCard';
import Benefit from './Benefit';
import CallToAction from './CallToAction';
import Testimoni from './Testimoni';
import Faq from './Faq';

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full space-y-8 sm:space-y-15">
            <Banner />
            <LogoSlider />
            <CourseCard />
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
