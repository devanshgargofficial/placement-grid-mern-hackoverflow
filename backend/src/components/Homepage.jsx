// components/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css'; // Import the custom CSS file

const HomePage = () => {
  const navigate = useNavigate();

  return (
    
    <div className=" main"> 
    {/* //min-h-screen flex flex-col items-center justify-center bg-gray-100 */}
      <h1 className="text-3xl font-bold mb-8">Welcome to Placement Platform</h1>
      <div className="flex w-full max-w-2xl bg-blue container">
      {/* grid grid-cols-1 sm:grid-cols-3 gap-6*/}
        <div
          className="p-6 bg-gray rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 card"
          onClick={() => navigate("/auth?role=student")}
        >
          <h2 className="text-xl font-bold">Student</h2>
          <p className="mt-2 text-gray-600">Access your dashboard and manage your profile.</p>
        </div>
        <div
          className="p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 card"
          onClick={() => navigate("/auth?role=recruiter")}
        >
          <h2 className="text-xl font-bold">Recruiter</h2>
          <p className="mt-2 text-gray-600">Post jobs and manage applications.</p>
        </div>
        <div
          className="p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 card"
          onClick={() => navigate("/auth?role=admin")}
        >
          <h2 className="text-xl font-bold">Admin</h2>
          <p className="mt-2 text-gray-600">Customize and manage placement activities.</p>
        </div>
      </div>
    </div>
  );
};



export default HomePage;