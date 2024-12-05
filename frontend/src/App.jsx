import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"; // Example Home Component
import JobDetails from "./components/Job/JobDetails";
import Sidebar from "./components/Home/Sidebar";
import JobsLayout from "./components/Pages/JobsLayout";
import EmployerApplications from "./components/Employer/EmployerApplications"; // New Component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/jobs" element={<JobsLayout />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/employer/applications" element={<EmployerApplications />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
