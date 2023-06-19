import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import LocationList from "./components/LocationList/LocationList";
import HospitalList from "./components/HospitalList/HospitalList";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import AddHospital from "./components/AddHospital/AddHospital";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<LocationList />} />
          <Route path="/location/:id" element={<HospitalList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/add-hospital" element={<AddHospital />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
