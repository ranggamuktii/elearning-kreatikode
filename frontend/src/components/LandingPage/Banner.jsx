import { useState, useEffect, useCallback } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Banner() {
  const slides = [
    {
      url: './kreatikode-banner.jpg',
    },
    {
      url: './kreatikode-banner-freeclass.jpg',
    },
    {
      url: './kreatikode-banner-react.jpg',
    },
    {
      url: './kreatikode-banner-talenta.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  }, [currentIndex, slides.length, goToSlide]);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchPosition(null);
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto py-5 px-4 mt-14 sm:mt-20 relative group">
      <div className="w-full aspect-[1600/450] relative rounded-2xl sm:rounded-3xl overflow-hidden">
        <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="absolute inset-0 bg-center bg-cover duration-500" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}></div>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 hover:text-white cursor-pointer" aria-label="Previous slide">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 hover:text-white cursor-pointer" aria-label="Next slide">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center gap-1 absolute left-1/2 -translate-x-1/2 -translate-y-8">
        {slides.map((_, index) => (
          <div key={index} onClick={() => goToSlide(index)} className={`text-2xl cursor-pointer transition-all ${index === currentIndex ? 'text-blue-500 scale-125' : 'text-gray-400'}`} aria-label={`Go to slide ${index + 1}`}>
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
