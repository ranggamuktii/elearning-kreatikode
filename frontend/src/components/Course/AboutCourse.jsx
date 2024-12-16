import PropTypes from 'prop-types';

const AboutCourse = ({ courses }) => {
  return (
    <div className="container w-2/3 mb-6">
      <div className="border bg-white rounded-lg p-6 mb-6 h-fit">
        <section>
          <h2 className="font-bold text-xl mb-2">Tentang Kelas</h2>
          <p className="mb-5">{courses.description}</p>
          <h3 className="text-lg font-bold mb-5">Apa yang akan kita pelajari?</h3>
          <ul className="list-disc pl-5 mb-5">
            {courses.introduction.whatWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="border bg-white rounded-lg p-6 h-fit">
        <section>
          <h2 className="font-bold text-xl mb-2">Persiapan Kelas</h2>
          <ul className="list-disc pl-5 mb-5">
            {courses.introduction.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

AboutCourse.propTypes = {
  courses: PropTypes.shape({
    description: PropTypes.string.isRequired,
    introduction: PropTypes.shape({
      whatWillLearn: PropTypes.arrayOf(PropTypes.string).isRequired,
      prerequisites: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};

// AboutCourse.defaultProps = {
//   courses: {
//     description: '',
//     introduction: {
//       whatWillLearn: [],
//       prerequisites: [],
//     },
//   },
// };

export default AboutCourse;
