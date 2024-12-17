import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SubMaterial = ({ courses }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState('auto');
  const contentRef = useRef(null);
  const initialVisibleCount = 3;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const visibleCourses = isExpanded ? courses : courses.slice(0, initialVisibleCount);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setContentHeight(isExpanded ? `${scrollHeight}px` : '12rem');
    }
  }, [isExpanded, courses]);

  return (
    <div className="border bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-fit mx-auto">
      <h2 className="font-semibold text-lg mb-4">Materi</h2>
      <div className="relative overflow-hidden transition-[height] duration-300 ease-in-out" style={{ height: contentHeight }}>
        <div ref={contentRef}>
          <ul className="space-y-2">
            {courses.map((topic, index) => (
              <li
                key={topic._id}
                className="bg-secondary-100 bg-opacity-80 p-3 rounded-lg hover:text-gray-800 transition-transform duration-300"
                style={{
                  transform: !isExpanded && index >= initialVisibleCount ? 'translateY(-0.5rem)' : 'translateY(0)',
                  opacity: !isExpanded && index >= initialVisibleCount ? 0 : 1,
                  transition: `all 300ms ease-in-out ${index * 50}ms`,
                }}
              >
                <p className="text-sm sm:text-base">
                  {index + 1}. {topic.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {!isExpanded && courses.length > initialVisibleCount && <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent transition-opacity duration-300" />}
      </div>

      {courses.length > initialVisibleCount && (
        <button onClick={toggleExpand} className="flex items-center justify-center gap-2 w-full mt-4 text-sm font-semibold">
          <p>{isExpanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}</p>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
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
