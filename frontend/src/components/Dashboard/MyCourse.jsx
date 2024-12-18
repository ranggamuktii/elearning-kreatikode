import PropTypes from 'prop-types';

const MyCourse = ({ isLoading, error, tabs, activeTab, setActiveTab, filteredCourses }) => {
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const displayedCourses = activeTab === 'Semua Kelas' ? filteredCourses.filter((course) => course.progress.percentage > 0) : filteredCourses;

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
        {displayedCourses.length === 0 ? <div className="text-center py-8 text-gray-500">Tidak ada kelas yang tersedia untuk kategori ini</div> : displayedCourses.map((course) => <CourseCard key={course._id} course={course} />)}
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const totalMaterials = course.materials?.length || 0;
  const completedCount = course.progress?.completedMaterials?.length || 0;
  const progressPercentage = totalMaterials > 0 ? (completedCount / totalMaterials) * 100 : 0;

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={course.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail.split('\\').pop()}` : '/https://placehold.co/400'}
          alt={course.title}
          className="w-12 h-12 object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-course-thumbnail.png';
          }}
        />
        <div>
          <h3 className="font-medium">{course.title}</h3>
          <span className="flex items-center">📚 {totalMaterials}</span>
          <div className="mt-2">
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressPercentage}%` }} />
            </div>
            <span className="text-sm text-gray-500">
              {completedCount} / {totalMaterials} Materi
            </span>
          </div>
        </div>
      </div>
      <button className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50" onClick={() => (window.location.href = `/course/${course._id}`)}>
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
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      materials: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
      progress: PropTypes.shape({
        completedMaterials: PropTypes.arrayOf(PropTypes.string),
        lastAccessedMaterial: PropTypes.string,
      }),
    })
  ).isRequired,
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
    progress: PropTypes.shape({
      completedMaterials: PropTypes.arrayOf(PropTypes.string),
      lastAccessedMaterial: PropTypes.string,
    }),
  }).isRequired,
};

export default MyCourse;
