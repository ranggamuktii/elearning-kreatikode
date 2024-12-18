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
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <h1 className="text-2xl font-semibold px-4 sm:px-8 py-8">Kelas Saya</h1>
      <div className="border-b text-center px-4 sm:px-8 py-3">
        <div className="flex space-x-3 sm:space-x-6 justify-between sm:justify-start">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? 'text-sm sm:text-base text-blue-600 border-b-2 border-blue-600' : 'text-sm sm:text-base text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-4">
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 space-y-4 sm:space-y-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={course.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail.split('\\').pop()}` : '/https://placehold.co/400'}
          alt={course.title}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/https://placehold.co/400';
          }}
        />
        <div>
          <h3 className="text-sm sm:text-base font-medium">{course.title}</h3>
          <span className="flex text-sm sm:text-base  items-center">📘 {totalMaterials}</span>
          <div className="mt-2 w-[200px] sm:w-[400px]">
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressPercentage}%` }} />
            </div>
            <span className="text-xs sm:text-sm  text-gray-500">
              {completedCount} / {totalMaterials} Materi
            </span>
          </div>
        </div>
      </div>
      <button className="px-4 py-1 sm:py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50" onClick={() => (window.location.href = `/course/${course._id}`)}>
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
