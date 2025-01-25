const mongoose = require('mongoose');
const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  companyLogo: { type: String },
  collegeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
  jobIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
