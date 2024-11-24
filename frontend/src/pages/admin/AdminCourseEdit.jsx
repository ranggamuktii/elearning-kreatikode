import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById, updateCourse, addMaterial, updateMaterial, deleteMaterial } from '../../services/api';
import CourseForm from '../../components/admin/CourseForm';
import AdminMaterialManager from '../../components/admin/AdminMaterialManager';

const AdminCourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await fetchCourseById(id);
        setCourseData(data);
        setMaterials(data.materials);
      } catch (err) {
        setError('Failed to fetch course data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  const handleCourseUpdate = async (formData) => {
    try {
      const updatedCourseData = { ...formData, materials };
      await updateCourse(id, updatedCourseData);
      navigate('/admin');
    } catch (err) {
      setError('Failed to update course');
      console.error(err);
    }
  };

  const handleAddMaterial = async (material) => {
    try {
      const { data } = await addMaterial(id, material);
      setMaterials(data.materials);
    } catch (err) {
      setError('Failed to add material');
      console.error(err);
    }
  };

  const handleEditMaterial = async (material) => {
    try {
      const { data } = await updateMaterial(id, material.order, material);
      setMaterials(data.materials);
    } catch (err) {
      setError('Failed to update material');
      console.error(err);
    }
  };

  const handleDeleteMaterial = async (order) => {
    try {
      const { data } = await deleteMaterial(id, order);
      setMaterials(data.materials);
    } catch (err) {
      setError('Failed to delete material');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

      {/* Form untuk mengedit kursus */}
      <CourseForm
        onSubmit={handleCourseUpdate}
        initialData={{
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          thumbnail: courseData.thumbnail,
          duration: courseData.duration,
          price: courseData.price,
          introduction: courseData.introduction,
        }}
      />

      {/* Material manager untuk mengelola materials */}
      <div className="mt-8">
        <AdminMaterialManager materials={materials} onAdd={handleAddMaterial} onEdit={handleEditMaterial} onDelete={handleDeleteMaterial} />
      </div>
    </div>
  );
};

export default AdminCourseEdit;
