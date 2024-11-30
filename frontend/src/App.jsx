import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Faq from './components/Landing Page/Faq';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Router>
  );
}

export default App;
