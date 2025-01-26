import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import csv from 'csv-parser';
import fs from 'fs';
import { College } from '../models/College.js';
import Admin from '../models/Admin.js';
import { Recruiter } from '../models/Recruiter.js';
import { Event } from '../models/Event.js';
import { Student } from '../models/Student.js';

// Register an admin
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.recruiter = await Recruiter.findById(decoded.id);
    if (!req.recruiter)
      return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export const registerAdmin = async (req, res) => {
  const { email, password, collegeName, address } = req.body;
  console.log(req.body, req.file);
  try {
    // Check if a file is uploaded
    const collegeLogo = req.file ? req.file.path : null;
    console.log(collegeLogo);
    if (!collegeLogo) {
      return res.status(400).json({ message: 'Logo is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const college = new College({
      name: collegeName,
      logo_url: collegeLogo, // Store the uploaded file path
      address,
    });
    await college.save();

    const admin = new Admin({
      email,
      password: hashedPassword,
      collegeId: college._id,
    });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Login an admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, 'your_secret_key', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Upload students via CSV
export const uploadStudentsCSV = async (req, res) => {
  const { collegeId } = req.admin;
  const csvFile = req.file;
  if (!csvFile) {
    return res
      .status(400)
      .json({ message: 'No file uploaded. Please upload a CSV file.' });
  }

  try {
    const students = [];
    fs.createReadStream(csvFile.path)
      .pipe(csv())
      .on('data', (row) => {
        const {
          name,
          gender,
          roll_no: rollNumber,
          dob,
          mobile: mobileNumber,
          '10th': marks10,
          '12th': marks12,
          btech: btechPercentage,
          cv: resumeLink,
          email,
          // Add any other fields like 'Engg. Branch' if needed
        } = row;

        students.push({
          email,
          password: collegeId,
          basicInfo: {
            name,
            gender,
            mobileNumber,
            rollNumber,
            dob,
            marks10,
            marks12,
            btechPercentage,
            resumeLink,
            // You can add extra fields like engineeringBranch or alternateContact if necessary
          },
        });
      })
      .on('end', async () => {
        const insertedStudents = await Student.insertMany(students);
        const studentIds = insertedStudents.map((student) => student._id);
        await Admin.findByIdAndUpdate(req.admin._id, { $push: { studentIds } });
        res.status(201).json({
          message: 'Students uploaded successfully',
          total: students.length,
        });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error processing CSV file', error });
  }
};

// Get all recruiters for the admin's college
export const getCompanyRecruiters = async (req, res) => {
  console.log('admin', req.admin);
  try {
    const recruiters = await Recruiter.find({ collegeId: req.admin.collegeId });
    res.status(200).json(recruiters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recruiters', error });
  }
};

// Get details of a specific company (jobs and student applications)
export const getCompanyDetails = async (req, res) => {
  const { companyId } = req.params;
  try {
    const jobs = await Job.find({
      recruiterId: companyId,
      collegeId: req.admin.collegeId,
    }).populate('applicants.studentId', 'basicInfo');
    const studentApplications = jobs.reduce((acc, job) => {
      acc.push(...job.applicants);
      return acc;
    }, []);
    res.status(200).json({ jobs, studentApplications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company details', error });
  }
};

// Create an event
export const createEvent = async (req, res) => {
  const { date, title, description, jobId, recruiterId } = req.body;
  try {
    const event = new Event({
      date,
      title,
      description,
      jobId,
      recruiterId,
      collegeId: req.admin.collegeId,
    });
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const updates = req.body;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventId, collegeId: req.admin.collegeId },
      updates,
      { new: true }
    );
    if (!event)
      return res
        .status(404)
        .json({ message: 'Event not found or unauthorized' });
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findOneAndDelete({
      _id: eventId,
      collegeId: req.admin.collegeId,
    });
    if (!event)
      return res
        .status(404)
        .json({ message: 'Event not found or unauthorized' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// Get all events in the admin's college
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ collegeId: req.admin.collegeId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};
