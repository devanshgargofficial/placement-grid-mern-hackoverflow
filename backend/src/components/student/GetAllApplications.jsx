import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/student/applications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setApplications(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching applications");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>Your GetAllApplications</h2>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>Job ID: {app.jobId}</p>
            <p>Status: {app.status}</p>
            <p>Date Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllApplications;
