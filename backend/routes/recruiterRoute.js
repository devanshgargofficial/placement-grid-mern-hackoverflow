// Recruiter Routes and Controllers

// recruiterRoutes.js

import express from 'express';
import {
  recruiterController,
  authenticate,
} from '../controllers/recruiterController.js';
const router = express.Router();

// Register a recruiter
router.post('/register', recruiterController.register);

// Login a recruiter
router.post('/login', recruiterController.login);

// Get all colleges
router.get('/colleges', authenticate, recruiterController.getAllColleges);

// Create a job
router.post('/jobs', authenticate, recruiterController.createJob);

// Update a job
router.put('/jobs/:id', authenticate, recruiterController.updateJob);

// Delete a job
router.delete('/jobs/:id', authenticate, recruiterController.deleteJob);

// Get all jobs posted by recruiter for a particular college
router.get(
  '/jobs/college/:collegeId',
  authenticate,
  recruiterController.getJobsByCollege
);

// Get student info for a particular job
router.get(
  '/jobs/:jobId/applicants',
  authenticate,
  recruiterController.getApplicantsForJob
);

export default router;
