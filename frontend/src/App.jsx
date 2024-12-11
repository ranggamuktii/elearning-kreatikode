import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Dashboard';
import PageFaq from './components/PageFaq';
import CourseDetail from './pages/IntroClass';
import 'flowbite-react';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/page_faq" element={<PageFaq />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
