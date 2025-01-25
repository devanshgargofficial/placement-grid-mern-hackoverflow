import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  uploadStudentsCSV,
  getCompanyRecruiters,
  getCompanyDetails,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
} from '../controllers/AdminController.js';
import authenticateAdmin from '../middleware/authenticateAdmin.js';
import { upload2, upload1 } from '../middleware/multerConfig.js';

const router = express.Router();

// Register an admin
router.post('/register', upload2.single('collegeLogo'), registerAdmin);

// Login an admin
router.post('/login', loginAdmin);

// Upload students via CSV (with Multer middleware for file upload)
router.post(
  '/students/upload',
  authenticateAdmin,
  upload1.single('studentsCSV'), // Multer middleware for handling single file upload
  uploadStudentsCSV
);

// Get all recruiters for the admin's college
router.get('/recruiters', authenticateAdmin, getCompanyRecruiters);

// Get details of a specific company (jobs and student applications)
router.get('/company/:companyId/details', authenticateAdmin, getCompanyDetails);

// CRUD operations for events
router.post('/events', authenticateAdmin, createEvent);
router.put('/events/:eventId', authenticateAdmin, updateEvent);
router.delete('/events/:eventId', authenticateAdmin, deleteEvent);

// Get all events in the admin's college
router.get('/events', authenticateAdmin, getAllEvents);

export default router;
