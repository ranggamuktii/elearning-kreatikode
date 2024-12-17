import PropTypes from 'prop-types';

const MyCourse = ({ isLoading, error, tabs, activeTab, setActiveTab, filteredCourses }) => {
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <h1 className="text-2xl font-semibold px-4 py-4">Kelas Saya</h1>
      <div className="border-b px-4 py-3">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredCourses.length === 0 ? <div className="text-center py-8 text-gray-500">Tidak ada kelas yang tersedia untuk kategori ini</div> : filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <img src={`${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail.split('\\').pop()}`} alt={course.title} className="w-12 h-12 object-cover rounded-lg" />
        <div>
          <h3 className="font-medium">{course.title}</h3>
          <span className="flex items-center">📚 {course.materials.length}</span>
          <div className="mt-2">
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
            <span className="text-sm text-gray-500">
              {course.completedSubmodules} / {course.totalSubmodules} Submateri
            </span>
          </div>
        </div>
      </div>
      <button
        className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
        onClick={() => {
          console.log(`Viewing details for course: ${course.title}`);
        }}
      >
        Lihat Detail Kelas
      </button>
    </div>
  );
};

MyCourse.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  filteredCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      materials: PropTypes.array.isRequired,
      progress: PropTypes.number.isRequired,
      completedSubmodules: PropTypes.number.isRequired,
      totalSubmodules: PropTypes.number.isRequired,
    })
  ).isRequired,
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    materials: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired,
    completedSubmodules: PropTypes.number.isRequired,
    totalSubmodules: PropTypes.number.isRequired,
  }).isRequired,
};

export default MyCourse;
