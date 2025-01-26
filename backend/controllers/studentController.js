import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Student } from "../models/Student.js";
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { Job } from "../models/Job.js";
// import { Application } from "../models/Application.js";
import mongoose from "mongoose";

const SECRET_KEY = "your_secret_key";

export const studentController = {
  // Register a student
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newStudent = new Student({
        // studentID: uuidv4(), // Generate a unique studentID
        email,
        password: hashedPassword,
        basicInfo: {name:name}
      });

      await newStudent.save();
      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering student", error });
    }
  },

  // Login a student
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: student._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  },

  // Update student profile
  updateProfile: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const student = await Student.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({ message: "Profile updated successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  },

  // Apply for a job
  applyForJob: async (req, res) => {
    const { jobId } = req.body;
    const studentId = req.recruiter._id;

    try {
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const newApplication = new Job({
        studentId,
        jobId,
      });

      await newApplication.save();

      job.applicants.push({ studentId });
      await job.save();

      res.status(201).json({ message: "Job application submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error applying for job", error });
    }
  },

  // Get all applications by the student
  getApplications: async (req, res) => {
    const studentId = req.recruiter._id;

    try {
      const applications = await Job.find({ studentId }).populate(
        "jobId",
        "title description"
      );

      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications", error });
    }
  },

  // Get all available jobs
  getJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs", error });
    }
  },
};

// Middleware for authentication
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.recruiter = await Student.findById(decoded.id);

    if (!req.recruiter) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
