import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/LandingPage/LandingPage';
import Course from './components/Course/Course';
import Profile from './components/Dashboard';
import PageFaq from './components/PageFaq';
import IntroClass from './pages/IntroClass';
import MaterialCourse from './pages/MaterialCourse';
import AboutUs from './pages/AboutUs';
import CourseQuiz from './components/Course/CourseQuiz';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite-react';
import './App.css';
import Modal from './components/Modal/quizModal';

function App() {
  return (
    <Router>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/page_faq" element={<PageFaq />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/:courseId" element={<IntroClass />} />
          <Route path="/course/:courseId/materials/:materialId" element={<MaterialCourse />} />
          <Route path="/course/:courseId/quiz" element={<CourseQuiz />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
