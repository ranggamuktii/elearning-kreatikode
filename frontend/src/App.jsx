import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CallToAction from './components/Landing Page/CallToAction'; // Ini nanti ganti aja ya sama component yang mau di coba
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ini juga ganti ya sama component yang mau di coba */}
        <Route path="/callToAction" element={<CallToAction />} />
      </Routes>
    </Router>
  );
}

export default App;
