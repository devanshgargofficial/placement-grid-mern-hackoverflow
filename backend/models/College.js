const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  address: { type: String },
});

const College = mongoose.model('College', collegeSchema);
