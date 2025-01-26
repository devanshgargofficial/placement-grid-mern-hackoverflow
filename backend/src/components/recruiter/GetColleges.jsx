import React, { useEffect, useState } from "react";
import axios from "axios";

const GetColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/recruiter/colleges");
        setColleges(response.data);
      } catch (error) {
        alert("Error fetching colleges");
      }
    };
    fetchColleges();
  }, []);

  return (
    <div>
      <h2>Colleges</h2>
      <ul>
        {colleges.map((college) => (
          <li key={college._id}>{college.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetColleges;
