import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loader/Loading';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
