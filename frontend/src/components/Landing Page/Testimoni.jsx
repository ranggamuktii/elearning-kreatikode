import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import testimoniData from '../../data/testimoni.js';
import 'swiper/css';
import 'swiper/css/pagination';

function Testimoni() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(3);
  //   const totalPages = Math.ceil(testimoniData.length / currentSlidesPerView);

  const handleSlideChange = (swiper) => {
    setActiveIndex(Math.floor(swiper.realIndex / currentSlidesPerView));
  };

  useEffect(() => {
    const adjustHeight = () => {
      const slides = document.querySelectorAll('.swiper-slide > div');
      let maxHeight = 0;

      slides.forEach((slide) => {
        slide.style.height = 'auto';
        maxHeight = Math.max(maxHeight, slide.offsetHeight);
      });

      slides.forEach((slide) => {
        slide.style.height = `${maxHeight}px`;
      });
    };

    adjustHeight();

    window.addEventListener('resize', adjustHeight);
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [activeIndex]);

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
        <div className="flex items-center max-w-[200px] sm:max-w-[250px] max-h-[280px] sm:max-h-[1100px] bg-primary-100  text-primary-600 py-0.5 px-2.5 text-xs sm:text-base font-medium rounded-[10px] space-x-1 sm:space-x-2 transform transition-transform-shadow duration-500 hover:shadow-custom-mild hover:shadow-primary-300 hover:scale-102">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Pendapat Pengguna</p>
        </div>
        <h1 className="w-[250px] sm:w-full text-xl sm:text-3xl font-medium transform transition-transform duration-500 hover:scale-105 ">Yang mereka katakan tentang Tixchain</h1>
      </div>
      <div className="m-2 sm:m-6 flex flex-col items-center">
        <Swiper
          id="swiper_Two"
          modules={[Pagination]}
          slidesPerView={currentSlidesPerView}
          slidesPerGroup={currentSlidesPerView}
          loop={true}
          loopFillGroupWithBlank={true}
          autoHeight={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
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
          className="max-w-[350px] sm:max-w-[1200px] "
        >
          {testimoniData.map((testimoni) => (
            <SwiperSlide key={testimoni.id}>
              <div className="swiper-slider py-3 sm:py-5 px-14 sm:px-3">
                <div className="bg-white flex flex-col border border-gray-200 rounded-[20px] max-w-[250px] max-h-[230px] sm:max-w-[400px] sm:max-h-[280px] p-5 sm:p-8 transform transition-transform-shadow duration-500 hover:shadow-custom-mild hover:shadow-primary-300 hover:scale-102">
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-xl font-semibold text-primary-600">&quot;{testimoni.title}&quot;</h4>
                    <p className="text-xs sm:text-base font-normal text-gray-600 leading-relaxed">{testimoni.review}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-5">
                    <img src={testimoni.profile} alt="Photo Profile" className="object-cover w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] rounded-full" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-medium">{testimoni.name}</h5>
                      <h5 className="text-[8px] sm:text-sm  font-normal">{testimoni.job}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Slider Indicator */}
        <div className="flex justify-center space-x-3  mt-1 sm:mt-6">
          {Array.from({ length: Math.ceil(testimoniData.length / currentSlidesPerView) }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`rounded-full transition-all duration-300 ${activeIndex === index ? 'w-6 h-2 bg-primary-600' : 'w-3 h-2 bg-gray-200'}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => Swiper.current?.slideTo(index * currentSlidesPerView)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimoni;
