import mongoose from 'mongoose';
const recruiterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  companyLogo: { type: String },
  collegeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
  jobIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

export const Recruiter = mongoose.model('Recruiter', recruiterSchema);
