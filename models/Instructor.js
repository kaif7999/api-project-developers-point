const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  expertise: { type: String, required: true },  // Expertise area of the instructor
  hireDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Instructor', instructorSchema);
