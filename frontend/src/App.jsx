import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Benefit from './components/Landing Page/Benefit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/benefit" element={<Benefit />} />
      </Routes>
    </Router>
  );
}

export default App;