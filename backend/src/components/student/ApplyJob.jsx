import React, { useState } from "react";
import axios from "axios";

const ApplyJob = () => {
  const [formData, setFormData] = useState({
    jobId: "",
    recruiterId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/student/apply", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error applying for job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for a Job</h2>
      <input
        type="text"
        name="jobId"
        placeholder="Job ID"
        value={formData.jobId}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="recruiterId"
        placeholder="Recruiter ID"
        value={formData.recruiterId}
        onChange={handleChange}
        required
      />
      <button type="submit">Apply</button>
    </form>
  );
};

export default ApplyJob;
