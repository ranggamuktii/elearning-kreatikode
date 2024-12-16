import PropTypes from 'prop-types';

const SubMaterial = ({ courses }) => {
  return (
    <div className="border bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-fit mx-auto">
      <h2 className="font-semibold text-lg mb-4">Materi</h2>
      <ul className="space-y-2">
        {courses.map((topic, index) => (
          <li key={topic._id} className="bg-secondary-100 p-3 rounded-md hover:text-gray-800">
            {index + 1}. {topic.title}
          </li>
        ))}
      </ul>
      <button className="font-semibold text-lg mt-2 py-2 w-full text-white bg-primary-500 rounded-full hover:bg-secondary-500">Lihat Selengkapnya</button>
    </div>
  );
};

SubMaterial.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// SubMaterial.defaultProps = {
//   courses: [],
// };

export default SubMaterial;
