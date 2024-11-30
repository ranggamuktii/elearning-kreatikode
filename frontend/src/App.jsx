import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Auth/Login'; // Ini nanti ganti aja ya sama component yang mau di coba
import Banner from './components/Landing Page/Banner';
// import Faq from './components/Landing Page/Faq';
import './App.css';
import 'flowbite-react';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ini juga ganti ya sama component yang mau di coba */}
        <Route path="/banner" element={<Banner />} />
      </Routes>
    </Router>
  );
}

export default App;
