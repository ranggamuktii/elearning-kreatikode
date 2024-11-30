import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'; // Ini nanti ganti aja ya sama component yang mau di coba
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ini juga ganti ya sama component yang mau di coba */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
