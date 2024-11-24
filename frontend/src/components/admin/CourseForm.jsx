import { useState } from 'react';
import PropTypes from 'prop-types';

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || '',
    thumbnail: initialData.thumbnail || '',
    duration: initialData.duration || '',
    price: initialData.price || '',
    introduction: initialData.introduction || {
      overview: '',
      whatWillLearn: [],
      prerequisites: [],
      targetAudience: [],
      tools: [],
    },
    materials: initialData.materials || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow-md rounded-md">
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2" required />
      <input type="url" name="thumbnail" placeholder="Thumbnail URL" value={formData.thumbnail} onChange={handleChange} className="w-full border p-2" required />
      <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} className="w-full border p-2" required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2" required />
      <textarea
        name="introduction.overview"
        placeholder="Overview"
        value={formData.introduction.overview}
        onChange={(e) =>
          setFormData({
            ...formData,
            introduction: { ...formData.introduction, overview: e.target.value },
          })
        }
        className="w-full border p-2"
        required
      />

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
    introduction: PropTypes.shape({
      overview: PropTypes.string,
      whatWillLearn: PropTypes.arrayOf(PropTypes.string),
      prerequisites: PropTypes.arrayOf(PropTypes.string),
      targetAudience: PropTypes.arrayOf(PropTypes.string),
      tools: PropTypes.arrayOf(PropTypes.string),
    }),
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default CourseForm;
