import { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const MaterialNavigator = ({ materials, initialIndex = 0, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    if (currentIndex < materials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(materials[currentIndex].content);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{materials[currentIndex].title}</h1>

      <div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevious} disabled={currentIndex === 0} className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === materials.length - 1} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Next
        </button>
        <button onClick={onExit} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Exit
        </button>
      </div>
    </div>
  );
};

MaterialNavigator.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onExit: PropTypes.func,
};

export default MaterialNavigator;
