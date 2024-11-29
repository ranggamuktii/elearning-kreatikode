import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourseEdit from './pages/admin/AdminCourseEdit';
import AdminCourseAdd from './pages/admin/AdminCourseAdd';
import AdminQuizzes from './pages/admin/adminQuiz';
import Home from './pages/user/Home';
import CoursePage from './pages/user/CoursePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CoursePage />} />

        {/* Admin Routes */}
        <Route path="/admin/add" element={<AdminCourseAdd />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminCourseEdit />} />
        
        {/* Quiz Routes */}
        <Route path="/admin/course/:id/quizzes" element={<AdminQuizzes />} />
      </Routes>
    </Router>
  );
};

export default App;
