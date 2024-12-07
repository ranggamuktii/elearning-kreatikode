import CourseMaterial from '../components/Course/CourseMaterial';
import CourseDetail from '../components/Course/CourseDetail';
import ContactAdmin from '../components/Course/ContactAdmin';

const MateriPage = () => {
  return (
    <div className="">
      <ContactAdmin />
      <div className="flex flex-1 m-9 gap-8">
        <CourseMaterial />
        <CourseDetail />
      </div>
    </div>
  );
};

export default MateriPage;
