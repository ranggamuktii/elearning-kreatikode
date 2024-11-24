import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CourseEditForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: '',
    duration: '',
    price: '',
    introduction: {
      overview: '',
      whatWillLearn: [],
      prerequisites: [],
      targetAudience: [],
      tools: [],
    },
    materials: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field, index) => {
    const newValue = [...formData[field]];
    newValue[index] = e.target.value;
    setFormData({ ...formData, [field]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">Edit Course</h2>

      {/* Basic Information */}
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2" required />
      <input type="url" name="thumbnail" placeholder="Thumbnail URL" value={formData.thumbnail} onChange={handleChange} className="w-full border p-2" required />
      <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} className="w-full border p-2" required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2" required />

      {/* Introduction */}
      <h3 className="font-semibold">Introduction</h3>
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
      />
      <div>
        <h4>What Will You Learn</h4>
        {formData.introduction.whatWillLearn.map((item, index) => (
          <input key={index} type="text" value={item} onChange={(e) => handleArrayChange(e, 'introduction.whatWillLearn', index)} className="w-full border p-2 mb-2" />
        ))}
      </div>

      {/* Materials */}
      <h3 className="font-semibold">Materials</h3>
      {formData.materials.map((material, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            name={`materials[${index}].title`}
            placeholder="Material Title"
            value={material.title}
            onChange={(e) => {
              const updatedMaterials = [...formData.materials];
              updatedMaterials[index].title = e.target.value;
              setFormData({ ...formData, materials: updatedMaterials });
            }}
            className="w-full border p-2"
          />
          <textarea
            name={`materials[${index}].content`}
            placeholder="Material Content"
            value={material.content}
            onChange={(e) => {
              const updatedMaterials = [...formData.materials];
              updatedMaterials[index].content = e.target.value;
              setFormData({ ...formData, materials: updatedMaterials });
            }}
            className="w-full border p-2"
          />
        </div>
      ))}

      {/* Submit */}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Save Changes
      </button>
    </form>
  );
};

// Add PropTypes validation
CourseEditForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
    introduction: PropTypes.shape({
      overview: PropTypes.string,
      whatWillYouLearn: PropTypes.arrayOf(PropTypes.string),
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
  onSubmit: PropTypes.func.isRequired,
};

export default CourseEditForm;
