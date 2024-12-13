import CourseMaterial from '../components/Course/CourseMaterial';
import CourseDetail from '../components/Course/CourseDetail';
import ContactAdmin from '../components/Course/ContactAdmin';

const MateriPage = () => {
    return (
        <div>
            <ContactAdmin />
            <div className="flex flex-col md:flex-row flex-1 m-4 gap-8">
                <CourseMaterial />
                <CourseDetail />
            </div>
        </div>
    );
};

export default MateriPage;
