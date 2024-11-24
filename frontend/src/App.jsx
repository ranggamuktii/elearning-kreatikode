import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourseEdit from './pages/admin/AdminCourseEdit';
import AdminCourseAdd from './pages/admin/AdminCourseAdd';
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
      </Routes>
    </Router>
  );
};

export default App;
