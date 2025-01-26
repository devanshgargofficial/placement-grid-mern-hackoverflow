import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  // studentId: {type:String, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  basicInfo: {
    name: { type: String, required: true },
    gender: { type: String },
    dob: { type: Date },
    mobileNumber: { type: String },
    rollNumber: { type: String },
    marks10: { type: Number },
    marks12: { type: Number },
    resumeLink: { type: String },
    btechPercentage: { type: Number },
  },
  education: [
    {
      college: { type: String },
      degree: { type: String },
      branch: { type: String },
      yearOfGraduation: { type: Number },
      cgpa: { type: Number },
    },
  ],
  projects: [
    {
      projectId: { type: String },
      projectName: { type: String },
      description: { type: String },
      technologiesUsed: [{ type: String }],
      link: { type: String },
    },
  ],
  internships: [
    {
      company: { type: String },
      role: { type: String },
      duration: { type: String },
      skillsLearned: [{ type: String }],
    },
  ],
  skills: [{ type: String }],
  appliedCompanies: [
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
      companyName: { type: String },
      status: {
        type: String,
        enum: ['applied', 'rejected', 'ongoing'],
        default: 'applied',
      },
      applicationDate: { type: Date },
    },
  ],
  atsScore: { type: Number },
  calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

export const Student = mongoose.model('Student', studentSchema);
