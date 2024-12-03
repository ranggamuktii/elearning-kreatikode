import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
