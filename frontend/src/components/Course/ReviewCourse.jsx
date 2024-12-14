import PropTypes from 'prop-types';

const ReviewCourse = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <img src={review.user.photoURL} className="bg-gray-300 w-10 h-10 rounded-full"></img>
            <div>
              <h3 className="font-semibold">{review?.user.name}</h3>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="text-gray-600">{review.text}</p>
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
