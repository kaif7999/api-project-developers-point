const Enrollment = require('../models/Enrollment');

// ➕ Enroll a Student
exports.enrollStudent = async (req, res) => {
  const { student, course } = req.body;

  try {
    const newEnrollment = new Enrollment({ student, course });
    await newEnrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get All Enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('student course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Get Enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student course');
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Enrollment
exports.updateEnrollment = async (req, res) => {
  const { student, course, status } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.student = student || enrollment.student;
    enrollment.course = course || enrollment.course;
    enrollment.status = status || enrollment.status;

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
