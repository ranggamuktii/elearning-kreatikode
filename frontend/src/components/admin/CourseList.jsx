import { useEffect, useState } from 'react';
import { fetchCourses, deleteCourse } from '../../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((course) => course._id !== id));
      } catch (err) {
        alert('Failed to delete course');
        console.log(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course._id} className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p>{course.description}</p>
            <span className="text-sm text-gray-500">{course.category}</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => (window.location.href = `/admin/edit/${course._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Edit
            </button>
            <button onClick={() => handleDelete(course._id)} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
