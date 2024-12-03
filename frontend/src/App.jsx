import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LogoSlider from './components/Landing Page/LogoSlider';
import Faq from './components/Landing Page/Faq';
import CallToAction from './components/Landing Page/CallToAction';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logo-slider" element={<LogoSlider />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/call-to-action" element={<CallToAction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
