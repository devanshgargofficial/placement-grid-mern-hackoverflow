const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }],
  calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const Admin = mongoose.model('Admin', adminSchema);
