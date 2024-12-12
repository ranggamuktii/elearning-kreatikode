import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourses } from '../services/api';
// import CourseCard from '../components/user/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <div className="flex flex-nowrap gap-2">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
