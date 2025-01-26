// components/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role");
  const isLogin = role === "student";

  const roleTitles = {
    student: "Student",
    recruiter: "Recruiter",
    admin: "Admin",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (role === "admin") navigate("/admin/registration");
      if (role === "recruiter") navigate("/recruiter/signupDetails");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        {isLogin ? "Login" : "Signup"} as {roleTitles[role]}
      </h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;