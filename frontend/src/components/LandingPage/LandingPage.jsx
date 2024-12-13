import { useEffect, useState } from 'react';
import Loading from '../Loader/Loading';
import Banner from './Banner';
import LogoSlider from './LogoSlider';
import CourseList from './CourseList';
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
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <Banner />
            </div>

            <div className="space-y-2">
              <LogoSlider />
              <CourseList />
            </div>

            <div className="space-y-8 mt-8">
              <Benefit />
              <Testimoni />
              <CallToAction />
              <Faq />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
