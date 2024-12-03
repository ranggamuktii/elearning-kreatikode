import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroClass from "./pages/IntroClass";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/introduction" element={<IntroClass />} />
      </Routes>
    </Router>
  );
};

export default App;
