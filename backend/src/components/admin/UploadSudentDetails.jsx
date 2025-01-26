import React, { useState } from "react";
import axios from "axios";

const UploadStudentDetails = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("studentsCSV", file);

    try {
      const response = await axios.post("/api/admin/students/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error uploading CSV file");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Students CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadStudentDetails;
