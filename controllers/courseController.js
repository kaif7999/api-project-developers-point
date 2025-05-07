const Course = require('../models/Course');

// ➕ Add New Course
exports.addCourse = async (req, res) => {
  const { title, description, instructor, duration, price } = req.body;

  try {
    const newCourse = new Course({ title, description, instructor, duration, price });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor');
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Course Details
exports.updateCourse = async (req, res) => {
  const { title, description, instructor, duration, price } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.title = title || course.title;
    course.description = description || course.description;
    course.instructor = instructor || course.instructor;
    course.duration = duration || course.duration;
    course.price = price || course.price;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
