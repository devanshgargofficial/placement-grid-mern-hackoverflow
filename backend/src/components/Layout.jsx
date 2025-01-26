import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export const Layout = ({ role }) => {
  // Sidebar options based on the role
  const sidebarOptions = {
    student: [
      { label: "Dashboard", path: "/student/dashboard" },
      { label: "Profile", path: "/student/profile/:id" },
      { label: "Job Listings", path: "/student/jobListings" },
      { label: "Apply for Job", path: "/student/profile/:id" },
      { label: "My Applications", path: "/student/getAllApplications" },
      { label: "Interview Preparation", path: "/student/interviewPreparation" },
    ],
    recruiter: [
      { label: "Dashboard", path: "/recruiter/dashboard" },
      {label: "Get College List", path:"/recruiter/getAllColleges"},
      { label: "Create New Post", path: "/recruiter/createJob" },
      {label:"Update a Job Post", path:"/recruiter/updateJob"},
      {label:"Delete a Job Post", path:"/recruiter/deleteJob"},
      { label: "Applicants for a Job", path: "/recruiter/applicants" },
      {label:"Create a ", path:""}
    ],
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Upload Student Details", path: "/admin/students/upload" },
      { label: "Recruiter List", path: "/admin/recruiters" },
      { label: "Specific Company Details", path: "/admin/company/:companyId/details" },
      { label: "Create A Event", path: "/admin/events/create" },
      { label: "Udate A Event", path: "/admin/events/:eventId/update" },
      { label: "Delete A Event", path: "/admin/events/:eventId/delete" },
      { label: "Create A Event", path: "/admin/events" }
      
    ],
  };

  return (
    <div className="flex flex-2 w-full min-h-screen">

      <div className="w-64 bg-gray-800 text-white flex flex-col">

        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            {sidebarOptions[role].map((option, index) => (
              <li key={index}>
                <NavLink
                  to={option.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md transition ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="mr-3">{option.icon}</span>
                  {option.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-700">
            <PowerIcon className="h-5 w-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Placement Platform</h1>
          <button className="text-red-500 hover:text-red-600 font-bold">
            Logout
          </button>
        </header> */}

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
