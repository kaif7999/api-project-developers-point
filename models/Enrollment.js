const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Enrolled' },  // Can be 'Completed', 'Pending', etc.
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
