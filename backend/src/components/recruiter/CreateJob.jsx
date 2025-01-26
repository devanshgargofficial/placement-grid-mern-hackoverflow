import React, { useState } from "react";
import axios from "axios";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    collegeId: "",
    rounds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/recruiter/create-job", jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error creating job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Job Title" onChange={handleChange} />
      <textarea name="description" placeholder="Job Description" onChange={handleChange}></textarea>
      <input type="text" name="collegeId" placeholder="College ID" onChange={handleChange} />
      <input
        type="text"
        name="rounds"
        placeholder="Rounds (comma-separated)"
        onChange={handleChange}
      />
      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJob;
