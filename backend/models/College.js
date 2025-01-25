import mongoose from 'mongoose';
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  address: { type: String },
});

export const College = mongoose.model('College', collegeSchema);
