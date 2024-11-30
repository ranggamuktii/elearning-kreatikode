import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-xl shadow-md overflow-hidden w-80">
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{course.title}</h3>
        <p className="text-gray-500 text-sm">{course.category}</p>
        <p className="mt-2">{course.description.slice(0, 100)}</p>
        <div className='flex items-center gap-1 mt-2 -mb-1'>
          <div className="w-full h-3 bg-gray-200 border-2 rounded-xl border-current">
            <div className="bg-blue-600 w-4/5 rounded-xl p-1 h-full">

            </div>
          </div>
          <p>80%</p>
        </div>
        <button onClick={() => (window.location.href = `/course/${course._id}`)} className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Lihat Kelas
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
