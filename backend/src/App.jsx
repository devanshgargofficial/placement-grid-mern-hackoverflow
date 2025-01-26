import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "./components/Homepage"
import AuthPage  from "./components/AuthPage";
import  Layout  from "./components/Layout";

import  CollegeRegistration from "./components/admin/CollegeRegistration";
import  AdminDashboard  from "./components/admin/AdminDashboard";
import  UploadStudentDetails  from "./components/admin/UploadSudentDetails";
import  GetCompanyDetails  from "./components/admin/GetCompanyDetails";
import  GetCompanyRecruiter  from "./components/admin/GetCompanyRecruiters";
import  CreateEvent  from "./components/admin/CreateEvent";
import  UpdateEvent  from "./components/admin/UpdateEvent";
import  DeleteEvent  from "./components/admin/DeleteEvent";
import  GetAllEvents  from "./components/admin/GetAllEvents";



import  StudentDashboard  from "./components/student/StudentDashboard";
import  UpdateProfile  from "./components/student/Profile";
import  JobListings  from "./components/student/JobListings";
import ApplyJob from "./components/student/ApplyJob";
import GetAllApplications from "./components/student/GetAllApplications";
import  InterviewPreparation  from "./components/student/InterviewPreparation";

import  ApplicantManagement  from "./components/recruiter/ApplicantManagement";


// recruiter
import RecruiterDashboard  from "./components/recruiter/RecruiterDashboard";
import RecruiterSignupDetails from "./components/recruiter/RecruiterSignupDetails";
import CreateJob from "./components/recruiter/CreateJob";
import UpdateJob from "./components/recruiter/UpdateJob";
import DeleteJob from "./components/recruiter/DeleteJob";
import GetColleges from "./components/recruiter/GetColleges";
import "./styles/tailwind.css";


function App() {
  return (
    <Router>
      
     
        <Routes>
          {/* Home Page */}
        <Route path="/" element={<HomePage />} />

         {/* Auth Page */}
         <Route path="/auth" element={<AuthPage />} />

          {/* College Registration */}
        <Route path="/admin/registration" element={<CollegeRegistration />} />


        {/* Recruiter Signup Details */}
        <Route path="/recruiter/signupDetails" element={<RecruiterSignupDetails />} />


        
        <Route path="/student/dashboard"></Route>


          {/* Layout Wrapper */}
          <Route element={<Layout role="student" />}>
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/profile/:id" element={<UpdateProfile />} />
          <Route path="/student/applyJob" element={<ApplyJob />} />
          <Route path="/student/jobListings" element={<JobListings />} />
          <Route path="/student/interviewPreparation" element={<InterviewPreparation />} />
          <Route path="/student/getAllApplications" element={<GetAllApplications />} />

          </Route>

          <Route element={<Layout role="recruiter" />}>
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/createJob" element={<CreateJob />} />
          <Route path="/recruiter/updateJob" element={<UpdateJob />} />
          <Route path="/recruiter/deleteJob" element={<DeleteJob />} />
          <Route path="/recruiter/getAllColleges" element = {<GetColleges/>} />
          <Route path="/recruiter/applicants" element={<ApplicantManagement />} />
          </Route>

          <Route element={<Layout role="admin" />}>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students/upload" element={<UploadStudentDetails />} />
          <Route path="/admin/recruiters" element={<GetCompanyRecruiter/>} />
          <Route path="/admin/company/:companyId/details" element={< GetCompanyDetails/>} />
          <Route path="/admin/events" element={<GetAllEvents />} />
          <Route path="/admin/events/create" element={<CreateEvent />} />
          <Route path="/admin/events/:eventId/update" element={<UpdateEvent />} />
          <Route path="/admin/events/:eventId/delete" element={<DeleteEvent />} />
          
          {/* <Route path="/admin/events/:eventId" element={<AdminDashboard />} /> */}
          {/* <Route path="/admin/events" element={<AdminDashboard />} /> */}
          {/* <Route path="/admin/events" element={<AdminDashboard />} /> */}
          </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
