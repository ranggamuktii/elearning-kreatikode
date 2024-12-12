import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Dashboard';
import PageFaq from './components/PageFaq';
import IntroClass from './pages/IntroClass';
import MaterialCourse from './pages/MaterialCourse';
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
          <Route path="/introduction" element={<IntroClass />} />
          <Route path="/course/:id" element={<MaterialCourse />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
