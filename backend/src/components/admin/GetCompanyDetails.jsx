import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GetCompanyDetails = () => {
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/admin/company/${companyId}/details`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCompanyData(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching company details");
      }
    };

    fetchDetails();
  }, [companyId]);

  return (
    <div>
      <h2>Company Details</h2>
      {companyData ? (
        <div>
          <h3>Jobs</h3>
          <ul>
            {companyData.jobs.map((job) => (
              <li key={job._id}>{job.title}</li>
            ))}
          </ul>
          <h3>Student Applications</h3>
          <ul>
            {companyData.studentApplications.map((application) => (
              <li key={application.studentId._id}>
                {application.studentId.basicInfo.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetCompanyDetails;
