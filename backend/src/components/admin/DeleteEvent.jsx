import React from "react";
import axios from "axios";

const DeleteEvent = ({ eventId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/admin/events/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
      if (onDelete) onDelete(eventId);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting event");
    }
  };

  return (
    <button onClick={handleDelete} style={{ color: "red" }}>
      Delete Event
    </button>
  );
};

export default DeleteEvent;
