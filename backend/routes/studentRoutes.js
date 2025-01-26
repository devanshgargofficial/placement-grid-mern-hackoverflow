import express from "express";
import { studentController } from "../controllers/studentController.js";
import { authenticate } from "../controllers/studentController.js";

const router = express.Router();

// Public routes
router.post("/register", studentController.register);
router.post("/login", studentController.login);

// Protected routes
router.use(authenticate);

// // Update student profile
router.put("/profile/:id", studentController.updateProfile);

// Apply for a job
router.post("/apply", studentController.applyForJob);

// Get all applications by the student
router.get("/applications", studentController.getApplications);

// Get all available jobs
router.get("/jobs", studentController.getJobs);

export default router;
