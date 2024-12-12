import { useEffect, useState } from 'react';
import { fetchCourses } from '../../services/api';
import CourseCard from './CourseCard';

function CourseList() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await fetchCourses();
        setCourses(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setIsLoading(false);
        console.error(err);
      }
    };

    getCourses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}

export default CourseList;
