import PropTypes from 'prop-types';

const Welcome = ({ isLoading, error, userDetails, lastActiveCourse }) => {
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="w-full bg-primary-500 text-white rounded-lg p-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">Halo, {userDetails?.name || 'Selamat Datang'}!</h1>
        <p className="text-lg">Mulai belajar lagi, dan jadilah mahir bersama Kreatikode.</p>
      </div>

      {lastActiveCourse ? (
        <div>
          <h2 className="text-lg text-gray-600 mb-6">Lanjutkan Progress Terakhir Kelas</h2>
          <div className="bg-white rounded-xl p-2 sm:p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm-space-y-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <img
                src={lastActiveCourse.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail/${lastActiveCourse.thumbnail.split('\\').pop()}` : 'https://placehold.co/400'}
                alt={lastActiveCourse.title}
                className="rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400';
                }}
              />
              <div className="w-[200px] sm:w-[400px]">
                <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">{lastActiveCourse.title}</h3>
                <span className="flex text-sm sm:text-base items-center gap-1">📘 {lastActiveCourse.materials.length} Materi</span>
                <div className="w-full mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${lastActiveCourse.progress.percentage}%` }} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {lastActiveCourse.progress.completedMaterials.length} / {lastActiveCourse.materials.length} Materi
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => (window.location.href = `/course/${lastActiveCourse._id}`)} className="w-full sm:w-1/6 px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600">
              Lihat Detail Kelas
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">Belum ada kelas yang sedang dipelajari</div>
      )}
    </div>
  );
};

Welcome.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  userDetails: PropTypes.shape({
    name: PropTypes.string,
  }),
  lastActiveCourse: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    progress: PropTypes.shape({
      percentage: PropTypes.number.isRequired,
      completedMaterials: PropTypes.arrayOf(PropTypes.string).isRequired,
      lastAccessedMaterial: PropTypes.string,
    }).isRequired,
  }),
};

export default Welcome;
