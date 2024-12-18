import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const ReviewCourse = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white border rounded-xl py-4 pl-4 pr-10">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.VITE_API_URL}${review?.user?.photoURL}`} className="bg-gray-300 w-10 h-10 rounded-full"></img>
            <div className="w-full flex justify-between">
              <h3 className="text-base sm:text-lg font-medium">{review?.user?.name}</h3>
              <p className="text-sm text-gray-500">{new Date(review?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 pl-12">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} className={`${i < review?.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors duration-200`} />
              ))}
            </div>
            <p className="text-gray-600">{review?.text}</p>
          </div>
        </div>
      ))}
      {(!reviews || reviews.length === 0) && <p className="text-gray-500 text-center py-4">Belum ada ulasan</p>}
    </div>
  );
};

ReviewCourse.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        photoURL: PropTypes.string,
        name: PropTypes.string,
      }),
      text: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
};

export default ReviewCourse;
