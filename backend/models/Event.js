const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true,
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
});

const Event = mongoose.model('Event', eventSchema);
