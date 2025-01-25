import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  rounds: [{ type: String }],
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true,
  },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  applicants: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      status: {
        type: String,
        enum: ['ongoing', 'rejected', 'accepted'],
        default: 'ongoing',
      },
    },
  ],
});
export const Job = mongoose.model('Job', jobSchema);
