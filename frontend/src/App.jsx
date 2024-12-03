import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroClass from "./pages/IntroClass";
import MaterialCourse from "./pages/MaterialCourse";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/introduction" element={<IntroClass />} />
        <Route path="/course" element={<MaterialCourse />} />
      </Routes>
    </Router>
  );
};

export default App;
