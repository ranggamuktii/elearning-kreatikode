import PropTypes from 'prop-types';
import Marquee from 'react-fast-marquee';

const LogoSlider = () => {
  const categories = ['Web Development', 'React', 'Fullstack Javascript', 'Cloud Computing', 'Fullstack Web Development', 'React Redux', 'UI/UX Designer', 'Javascript Intermediate'];

  const MarqueeItem = ({ text }) => (
    <div
      className="bg-white m-0 sm:m-4 rounded-full flex py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-base font-medium cursor-pointer text-neutral-700 shadow-md hover:shadow-none hover:bg-primary-100 hover:bg-opacity-50 hover:text-primary-500"
      onClick={() => {
        window.location.href = '/course';
      }}
    >
      {text}
    </div>
  );

  return (
    <div className="bg-neutral-50 p-2 sm:p-3 -translate-y-4">
      <Marquee className="mx-auto max-w-full sm:max-w-[90%]" autoFill speed={50} pauseOnHover>
        {categories.map((category, index) => (
          <MarqueeItem key={`${category}-${index}`} text={category} />
        ))}
      </Marquee>
    </div>
  );
};

LogoSlider.propTypes = {
  text: PropTypes.string,
};

export default LogoSlider;
