import { useState } from 'react';
import MaterialForm from './MaterialForm';
import PropTypes from 'prop-types';

const AdminMaterialManager = ({ materials, onAdd, onEdit, onDelete }) => {
  const [editingMaterial, setEditingMaterial] = useState(null);

  const handleSubmit = (data) => {
    if (editingMaterial) {
      onEdit({ ...editingMaterial, ...data });
      setEditingMaterial(null);
    } else {
      onAdd(data);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Materials</h2>

      {materials.map((material, index) => (
        <div key={material.order || index} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md">
          <div>
            <h3 className="font-bold">{material.title}</h3>
            <p>{material.content.slice(0, 100)}...</p>
            <span className="text-sm text-gray-500">Order: {material.order}</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setEditingMaterial(material)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Edit
            </button>
            <button onClick={() => onDelete(material.order)} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">{editingMaterial ? 'Edit Material' : 'Add Material'}</h3>
      <MaterialForm onSubmit={handleSubmit} initialData={editingMaterial} buttonLabel={editingMaterial ? 'Update Material' : 'Add Material'} />
    </div>
  );
};

AdminMaterialManager.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminMaterialManager;
