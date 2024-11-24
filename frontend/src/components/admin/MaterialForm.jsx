import { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import PropTypes from 'prop-types';
import { fetchMaterialById } from '../../services/api';

const MaterialForm = ({ materialId, initialData = {}, onSubmit, buttonLabel = 'Add Material' }) => {
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    order: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Material Content....',
    }),
    []
  );

  useEffect(() => {
    const getMaterialData = async () => {
      if (materialId) {
        setLoading(true);
        try {
          const { data } = await fetchMaterialById(materialId);
          setFormData({
            title: data.title || '',
            content: data.content || '',
            order: data.order || '',
          });
        } catch (err) {
          console.error('Failed to fetch material data:', err);
          setError('Failed to fetch material data.');
        } finally {
          setLoading(false);
        }
      } else if (Object.keys(initialData).length > 0) {
        setFormData({
          title: initialData.title || '',
          content: initialData.content || '',
          order: initialData.order || '',
        });
      }
    };

    getMaterialData();
  }, [materialId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow-md rounded-md">
      <input type="text" name="title" placeholder="Material Title" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
      <div className="jodit-editor-container">
        <JoditEditor ref={editor} value={formData.content} config={config} tabIndex={1} onBlur={(content) => setFormData((prev) => ({ ...prev, content }))} onChange={() => {}} />
      </div>
      <input type="number" name="order" placeholder="Material Order" value={formData.order} onChange={handleChange} className="w-full border p-2" required />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {buttonLabel}
      </button>
    </form>
  );
};

MaterialForm.propTypes = {
  materialId: PropTypes.string,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
};

export default MaterialForm;
