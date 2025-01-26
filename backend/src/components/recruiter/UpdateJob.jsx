import React, { useState } from "react";
import axios from "axios";

const UpdateJob = ({ jobId }) => {
  const [updates, setUpdates] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdates({ ...updates, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/recruiter/update-job/${jobId}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error updating job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Job Title" onChange={handleChange} />
      <textarea name="description" placeholder="Job Description" onChange={handleChange}></textarea>
      <button type="submit">Update Job</button>
    </form>
  );
};

export default UpdateJob;
