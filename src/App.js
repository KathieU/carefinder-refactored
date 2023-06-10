import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationList from "./components/LocationList";
import HospitalList from "./components/HospitalList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/location/:id" element={<HospitalList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;