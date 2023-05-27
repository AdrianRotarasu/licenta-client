import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import CarPlate from './pages/car plate/car_plate';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={<CarPlate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
