import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-md shadow-md overflow-hidden">
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{course.title}</h3>
        <p className="text-gray-500">{course.category}</p>
        <p className="mt-2">{course.description.slice(0, 100)}...</p>
        <button onClick={() => (window.location.href = `/course/${course._id}`)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Learn More
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
