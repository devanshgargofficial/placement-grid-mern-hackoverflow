import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCompanyRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get("/api/admin/recruiters", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRecruiters(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching recruiters");
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div>
      <h2>Recruiters</h2>
      <ul>
        {recruiters.map((recruiter) => (
          <li key={recruiter._id}>{recruiter.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetCompanyRecruiters;
