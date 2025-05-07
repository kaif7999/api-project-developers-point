const Course = require('../models/Course');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Lead = require('../models/Lead');

// Get Institute Summary
exports.getInstituteSummary = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalInstructors = await Instructor.countDocuments();
    const totalLeads = await Lead.countDocuments();

    const summary = {
      totalCourses,
      totalStudents,
      totalInstructors,
      totalLeads
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
