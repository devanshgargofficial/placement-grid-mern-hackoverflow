import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { College } from '../models/College.js';
import Admin from '../models/Admin.js';
import { Recruiter } from '../models/Recruiter.js';
import { Event } from '../models/Event.js';
import { Student } from '../models/Student.js';
import { Job } from '../models/Job.js';
import mongoose from 'mongoose';
// Middleware for authentication
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token', token);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    console.log('decoded', decoded);
    req.recruiter = await Recruiter.findById(decoded.id);
    if (!req.recruiter)
      return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const recruiterController = {
  register: async (req, res) => {
    const { email, password, companyName, companyDescription } = req.body;
    console.log(req.body);
    try {
      const company_logo = req.file ? req.file.path : null;
      console.log(company_logo);
      if (!company_logo) {
        return res.status(400).json({ message: 'Logo is required' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const recruiter = new Recruiter({
        email,
        password: hashedPassword,
        companyName,
        companyLogo: company_logo,
        companyDescription,
      });
      await recruiter.save();
      res.status(201).json({ message: 'Recruiter registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering recruiter', error });
    }
  },
  getCollegeInfo: async (req, res) => {
    const collegeId = req.params.id;
    console.log('college id', collegeId);
    try {
      console.log('type', mongoose.Types.ObjectId.isValid(collegeId));

      const college = await College.findById(collegeId);
      if (!college)
        return res.status(404).json({ message: 'College not found' });
      res.status(200).json(college);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching college info', error });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      const recruiter = await Recruiter.findOne({ email });
      if (!recruiter)
        return res.status(404).json({ message: 'Recruiter not found' });

      const isPasswordValid = await bcrypt.compare(
        password,
        recruiter.password
      );
      if (!isPasswordValid)
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: recruiter._id }, 'your_secret_key', {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  },

  getAllColleges: async (req, res) => {
    try {
      const colleges = await College.find();
      res.status(200).json(colleges);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching colleges', error });
    }
  },

  createJob: async (req, res) => {
    const { title, description, collegeId, rounds } = req.body;
    console.log(title, description, collegeId, rounds);
    console.log('recruiter', req.recruiter);
    try {
      const job = new Job({
        title,
        description,
        collegeId,
        rounds,
        recruiterId: req.recruiter._id,
      });
      await job.save();
      req.recruiter.jobIds.push(job._id);
      await req.recruiter.save();

      const admin = await Admin.findOne({ collegeId: collegeId });
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      admin.companies.push({ companyId: req.recruiter._id, jobId: job._id });
      await admin.save();
      res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
      res.status(500).json({ message: 'Error creating job', error });
    }
  },

  updateJob: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    console.log('id', id);
    console.log(req.body);
    try {
      const job = await Job.findOneAndUpdate(
        { _id: id, recruiterId: req.recruiter._id },
        updates,
        { new: true }
      );
      if (!job)
        return res
          .status(404)
          .json({ message: 'Job not found or unauthorized' });
      res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
      res.status(500).json({ message: 'Error updating job', error });
    }
  },

  deleteJob: async (req, res) => {
    const { id } = req.params;

    try {
      const job = await Job.findOneAndDelete({
        _id: id,
        recruiterId: req.recruiter._id,
      });
      if (!job)
        return res
          .status(404)
          .json({ message: 'Job not found or unauthorized' });
      req.recruiter.jobIds = req.recruiter.jobIds.filter(
        (jobId) => jobId.toString() !== id
      );
      await req.recruiter.save();
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting job', error });
    }
  },

  getJobsByCollege: async (req, res) => {
    const { collegeId } = req.params;

    try {
      const jobs = await Job.find({
        recruiterId: req.recruiter._id,
        collegeId,
      });
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  },

  getApplicantsForJob: async (req, res) => {
    const { jobId } = req.params;

    try {
      const job = await Job.findOne({
        _id: jobId,
        recruiterId: req.recruiter._id,
      }).populate('applicants.studentId', 'basicInfo');
      if (!job)
        return res
          .status(404)
          .json({ message: 'Job not found or unauthorized' });
      res.status(200).json(job.applicants);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching applicants', error });
    }
  },
};
