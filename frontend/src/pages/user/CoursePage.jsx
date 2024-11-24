import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../services/api';
import CourseDetail from '../../components/user/CourseDetail';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const { data } = await fetchCourseById(id);
      setCourse(data);
    };
    getCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <CourseDetail course={course} />
    </div>
  );
};

export default CoursePage;
