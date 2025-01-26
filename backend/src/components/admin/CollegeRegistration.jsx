import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CollegeRegistration = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeName: "",
    address: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/admin/register-college", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register college");
      }

      setSuccessMessage("College registered successfully!");
      setFormData({
        collegeName: "",
        address: "",
        email: "",
        password: "",
      });
      navigate("/admin/students/upload");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Register a New College</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="collegeName"
          >
            College Name
          </label>
          <input
            id="collegeName"
            name="collegeName"
            type="text"
            value={formData.collegeName}
            onChange={handleChange}
            placeholder="Enter the college name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter the college address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter the admin email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter the admin password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
        >
          Register College
        </button>
      </form>
    </div>
  );
};

export default CollegeRegistration;











// import React from 'react'
// import { useNavigate, useSearchParams } from "react-router-dom";

// function CollegeRegistration() {
//     const navigate = useNavigate();
//   return (
//     <div>
//         <form action="submit" method="post">
//             <label htmlFor="College Name:">
//                 <input type="text" />
//             </label>
//             <label htmlFor="Address:">
//                 <input type="text" />
//             </label>
//             <label htmlFor="College Logo:">
//                 <input type="text" />
//             </label>
//         </form>
//         <button onClick={() => navigate("/admin/dashboard")}>Submit</button>
      
//     </div>
//   )
// }
// 
// export default CollegeRegistration;
