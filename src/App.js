import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HospitalList from "./components/HospitalList";
import HospitalDetails from "./components/HospitalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<HospitalList />} />
          <Route path="/hospital/:id" element={<HospitalDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
