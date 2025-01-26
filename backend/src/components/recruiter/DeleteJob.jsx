import React, { useState } from "react";
import axios from "axios";

const DeleteJob = () => {
  const [jobId, setJobId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setJobId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/recruiter/delete-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust this if your token is stored differently
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error occurred while deleting job"
      );
    }
  };

  return (
    <div>
      <h2>Delete Job Post</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          name="jobId"
          placeholder="Enter Job ID"
          value={jobId}
          onChange={handleChange}
          required
        />
        <button type="submit">Delete Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteJob;
