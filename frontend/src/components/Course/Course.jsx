import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import CourseCard from '../LandingPage/CourseCard';
import Loading from '../Loader/Loading';
import { useEffect, useState } from 'react';
import { fetchCourses } from '../../services/api';
import { showErrorToast } from '../Utils/toastUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const topics = [
  { id: 'all', label: 'Semua Kelas' },
  { id: 'web development', label: 'Web Development' },
  { id: 'react', label: 'React' },
  { id: 'redux', label: 'Redux' },
  { id: 'react redux', label: 'React Redux' },
  { id: 'mobile', label: 'Mobile Development' },
];

const levels = [
  { id: 'all', label: 'Semua Level' },
  { id: 'beginner', label: 'Pemula' },
  { id: 'intermediate', label: 'Menengah' },
  { id: 'advanced', label: 'Mahir' },
];

const FilterSection = ({ title, items, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b pb-4">
      <button className="flex justify-between items-center w-full py-2" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="space-y-2 mt-2">
          {items.map((item) => (
            <label key={item.id} className="flex items-center space-x-2">
              <input type="checkbox" checked={selected.includes(item.id)} onChange={() => onChange(item.id)} className="w-4 h-4 text-primary-600 rounded" />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileFilter = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-y-0 right-0 max-w-[300px] w-full bg-white shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filter</h2>
            <button onClick={onClose} className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const Course = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState(['all']);
  const [selectedLevels, setSelectedLevels] = useState(['all']);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          showErrorToast('Data kelas tidak valid');
        }
        setIsLoading(false);
      } catch (err) {
        showErrorToast('Gagal memuat data kelas');
        setIsLoading(false);
        console.error(err);
      }
    };

    getCourses();
  }, []);

  const handleTopicChange = (topicId) => {
    setSelectedTopics((prev) => {
      if (topicId === 'all') return ['all'];
      const newSelection = prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev.filter((id) => id !== 'all'), topicId];
      return newSelection.length === 0 ? ['all'] : newSelection;
    });
  };

  const handleLevelChange = (levelId) => {
    setSelectedLevels((prev) => {
      if (levelId === 'all') return ['all'];
      const newSelection = prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev.filter((id) => id !== 'all'), levelId];
      return newSelection.length === 0 ? ['all'] : newSelection;
    });
  };

  const FilterContent = () => (
    <>
      <FilterSection title="Topik" items={topics} selected={selectedTopics} onChange={handleTopicChange} />
      <FilterSection title="Level" items={levels} selected={selectedLevels} onChange={handleLevelChange} />
    </>
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearchQuery = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopicFilter = selectedTopics.includes('all') || selectedTopics.some((topic) => course.category.toLowerCase().includes(topic.toLowerCase()));
    const matchesLevelFilter = selectedLevels.includes('all') || selectedLevels.includes(course.level);

    return matchesSearchQuery && matchesTopicFilter && matchesLevelFilter;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-14 py-16 sm:px-6 lg:px-8 mt-10 sm:mt-20">
          <div className="space-y-4 text-center">
            <div>
              <p className="text-lg font-semibold">Pilihan Kelas</p>
              <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Berbagai Pilihan kelas Gratis di Kreatikode</h1>
            </div>
            <p className="max-w-2xl mx-auto">Kreatikode menyediakan berbagai macam kelas programing gratis yang dapat kamu akses kapan pun untuk meningkatkan keterampilan kamu!</p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900" placeholder="Cari kelas..." />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-28 w-full flex flex-col sm:flex-row gap-6 py-6">
        <button className="sm:hidden px-4 py-2 border rounded-lg flex items-center justify-center" onClick={() => setIsMobileFilterOpen(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filter
        </button>

        {/* Mobile Filter Drawer */}
        <MobileFilter isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
          <FilterContent />
        </MobileFilter>

        {/* Desktop Sidebar */}
        <div className="hidden sm:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6 bg-white rounded-xl border p-4">
            <FilterContent />
          </div>
        </div>

        {/* Course List */}
        <div className="flex flex-col">
          {isLoggedIn && (
            <div className="space-y-5">
              <h1 className="text-xl sm:text-2xl font-semibold">Kelas Saya</h1>

              <Swiper
                spaceBetween={-60}
                slidesPerView={'auto'}
                className="w-full"
                breakpoints={{
                  0: {
                    slidesOffsetBefore: 16,
                    slidesOffsetAfter: 16,
                  },
                  640: {
                    slidesOffsetBefore: 112,
                    slidesOffsetAfter: 112,
                  },
                }}
              >
                {filteredCourses.map((course) => (
                  <SwiperSlide key={`my-${course._id}`} style={{ width: '330px' }} className="!h-auto">
                    <CourseCard course={course} progressFilter={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="space-y-5 mt-10">
            <h1 className="text-xl sm:text-2xl font-semibold">Semua Kelas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? filteredCourses.map((course) => <CourseCard key={course._id} course={course} />) : <div className="col-span-full text-center text-gray-500">No courses found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Course.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    })
  ),
};

MobileFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Course;
