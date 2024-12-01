import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testimoni from './components/Landing Page/Testimoni';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/testimoni" element={<Testimoni />} />
      </Routes>
    </Router>
  );
}

export default App;
