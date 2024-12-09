import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Banner() {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://assets.skilvul.com/campaign/1726654178187.jpg',
    },
    {
      url: 'https://assets.skilvul.com/campaign/impact-report-modal-modal-1680152788643.png',
    },
    {
      url: 'https://assets.skilvul.com/campaign/1725847935805.jpg',
    },
  ];

  const [currentIndex, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrent(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  return (
    <div className="max-w-[1400px] h-[480px] w-full m-auto py-5 px-4 mt-10 sm:mt-20 relative group">
      <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500"></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 hover:text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 hover:text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => setCurrent(slideIndex)} className="text-2xl cursor-pointer">
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
