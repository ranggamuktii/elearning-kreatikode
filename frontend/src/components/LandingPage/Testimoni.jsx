import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import testimoniData from '../../data/testimoni.js';
import 'swiper/css';
import 'swiper/css/pagination';

const swiperStyles = `
  .swiper {
    padding-bottom: 10px !important;
    height: auto !important;
  }
  
  .swiper-wrapper {
    height: auto !important;
    padding-bottom: 8px !important;
  }

  .swiper-slide {
    height: auto !important;
  }

  @media (max-width: 768px) {
    .swiper-slide {
      display: flex !important;
      justify-content: center !important;
    }
  }
`;

function Testimoni() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(3);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(Math.floor(swiper.realIndex / currentSlidesPerView));
  };

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = swiperStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setCurrentSlidesPerView(1);
      } else {
        setCurrentSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <div className="mx-auto py-10">
      <div className="flex flex-col items-center text-center mx-auto space-y-2">
        <h1 className="w-[300px] sm:w-full text-xl sm:text-3xl text-primary-500 font-semibold transform transition-transform duration-500 hover:scale-105">Apa kata mereka tentang Kreatikode?</h1>
        <p className="w-[300px] sm:w-[900px] text-xs sm:text-base pt-2">
          Lebih dari <span className="font-bold">1000</span> Talenta Digital telah berkembang bersama KreatiKode. Yuk, simak pengalaman seru dan manfaat yang dirasakan para Pengguna. Apakah kamu yang berikutnya?
        </p>
      </div>
      <div className="relative m-2 sm:m-6">
        <div className="flex flex-col items-center">
          <Swiper
            id="swiper_Two"
            ref={swiperRef}
            modules={[Pagination]}
            slidesPerView={currentSlidesPerView}
            slidesPerGroup={currentSlidesPerView}
            loop={true}
            autoHeight={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            className="max-w-[350px] sm:max-w-[1350px]"
          >
            {testimoniData.map((testimoni) => (
              <SwiperSlide key={testimoni.id}>
                <div className="h-full py-3 sm:py-5 px-6 sm:px-3">
                  <div className="bg-white flex flex-col border border-gray-200 rounded-[20px] h-full p-5 sm:p-8 transform transition-transform-shadow duration-500 hover:shadow-custom-mild hover:shadow-primary-100 hover:scale-102">
                    <div className="space-y-2 sm:space-y-3 flex-grow">
                      <svg className="w-5 h-5 sm:w-8 sm:h-8 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-xs sm:text-base font-normal text-gray-600 leading-relaxed">{testimoni.review}</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-5">
                      <img src={testimoni.profile} alt="Photo Profile" className="object-cover w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full" />
                      <div>
                        <h5 className="text-xs sm:text-sm font-medium">{testimoni.name}</h5>
                        <h5 className="text-[8px] sm:text-sm font-normal">{testimoni.job}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3">
          {Array.from({ length: Math.ceil(testimoniData.length / currentSlidesPerView) }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`rounded-full transition-all duration-300 ${activeIndex === index ? 'w-6 h-2 bg-primary-500' : 'w-3 h-2 bg-gray-200'}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => swiperRef.current?.slideTo(index * currentSlidesPerView)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimoni;
