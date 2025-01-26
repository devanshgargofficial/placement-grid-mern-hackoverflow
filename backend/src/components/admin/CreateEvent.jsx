import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
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
      const response = await axios.post("/api/admin/events", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
      alert("Event Created Successfully!")
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="jobId"
        placeholder="Job ID (optional)"
        value={formData.jobId}
        onChange={handleChange}
      />
      <input
        type="text"
        name="recruiterId"
        placeholder="Recruiter ID (optional)"
        value={formData.recruiterId}
        onChange={handleChange}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
