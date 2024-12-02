import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogoSlider from './components/Landing Page/LogoSlider';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ini juga ganti ya sama component yang mau di coba */}
        <Route path="/logo-slider" element={<LogoSlider />} />
      </Routes>
    </Router>
  );
}

export default App;
