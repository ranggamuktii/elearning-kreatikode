import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../services/api';
import CourseForm from '../../components/admin/CourseForm';

const AdminCourseAdd = () => {
  const navigate = useNavigate();

  const handleSubmit = async (newCourseData) => {
    try {
      await createCourse(newCourseData);
      navigate('/admin');
    } catch (err) {
      alert('Failed to create course');
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <CourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminCourseAdd;
