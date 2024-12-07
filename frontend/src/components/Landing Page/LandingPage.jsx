import { useEffect, useState } from 'react';
import Loading from '../Loading';
import LogoSlider from './LogoSlider';
import Benefit from './Benefit';
import CallToAction from './CallToAction';
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
          <div className="flex flex-col w-full space-y-10 sm:space-y-20">
            <LogoSlider />
            <Benefit />
            <CallToAction />
            <Faq />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
