import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployerApplications.css";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ jobId: "", status: "" });

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/applications/employer/getall",
        {
          params: filters,
          withCredentials: true,
        }
      );
      setApplications(response.data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    const urlMap = {
      reject: `http://localhost:4000/api/v1/applications/reject/${id}`,
      move: `http://localhost:4000/api/v1/applications/next-round/${id}`,
      hire: `http://localhost:4000/api/v1/applications/hire/${id}`,
    };

    try {
      await axios.put(urlMap[action], null, { withCredentials: true });
      fetchApplications(); // Refresh applications after action
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  if (isLoading) return <p>Loading applications...</p>;

  return (
    <div className="employer-applications">
      <h1>Job Applications</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Job ID"
          value={filters.jobId}
          onChange={(e) => setFilters({ ...filters, jobId: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Next Round">Next Round</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
      {applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        applications.map((application) => (
          <div key={application._id} className="application-card">
            <p>
              <strong>Name:</strong> {application.name}
            </p>
            <p>
              <strong>Email:</strong> {application.email}
            </p>
            <p>
              <strong>Phone:</strong> {application.phone}
            </p>
            <p>
              <strong>Cover Letter:</strong> {application.coverLetter}
            </p>
            <p>
              <strong>Status:</strong> {application.status}
            </p>
            <div className="action-buttons">
              <button onClick={() => handleAction(application._id, "move")}>
                Move to Next Round
              </button>
              <button onClick={() => handleAction(application._id, "reject")}>
                Reject
              </button>
              <button onClick={() => handleAction(application._id, "hire")}>
                Hire
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerApplications;
