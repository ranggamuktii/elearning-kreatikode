import PropTypes from 'prop-types';

const ClassBanner = ({ courses }) => {
  return (
    <div className="w-full bg-gray-200 ">
      <div>
        <div className=" ml-10 mr-10 flex items-center justify-between space-x-4">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-color-text mb-4">{courses.title}</h1>

            <p className="mb-4 text-base">{courses.description}</p>
            <button className="bg-primary-500 text-color-text-2 p-3 px-5 rounded-md font-semibold">Mulai Kelas Ini</button>
          </div>
          <img src="HTML.png" alt="Class Image" className="w-[500px] h-[300px] rounded-lg mt-20 mb-20" />
        </div>
      </div>
    </div>
  );
};

ClassBanner.propTypes = {
  courses: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

ClassBanner.defaultProps = {
  courses: {
    title: '',
    description: '',
  },
};

export default ClassBanner;
