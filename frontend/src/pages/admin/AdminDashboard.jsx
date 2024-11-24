import { useEffect, useState } from 'react';
import { fetchCourses, deleteCourse } from '../../services/api';
import CourseList from '../../components/admin/CourseList';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const { data } = await fetchCourses();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    getCourses();
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CourseList courses={courses} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
