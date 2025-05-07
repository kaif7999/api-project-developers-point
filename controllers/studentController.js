const Student = require('../models/Student');

// ➕ Add New Student
exports.addStudent = async (req, res) => {
  const { name, email, phone, course } = req.body;

  try {
    const newStudent = new Student({ name, email, phone, course });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('course');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Get Student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('course');
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Student Details
exports.updateStudent = async (req, res) => {
  const { name, email, phone, course } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.course = course || student.course;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
