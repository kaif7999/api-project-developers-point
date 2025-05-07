const Instructor = require('../models/Instructor');

// ➕ Add New Instructor
exports.addInstructor = async (req, res) => {
  const { name, email, phone, expertise } = req.body;

  try {
    const newInstructor = new Instructor({ name, email, phone, expertise });
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get All Instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Get Instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Instructor Details
exports.updateInstructor = async (req, res) => {
  const { name, email, phone, expertise } = req.body;

  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    instructor.name = name || instructor.name;
    instructor.email = email || instructor.email;
    instructor.phone = phone || instructor.phone;
    instructor.expertise = expertise || instructor.expertise;

    await instructor.save();
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });
    res.json({ message: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
