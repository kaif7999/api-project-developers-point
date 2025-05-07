const express = require('express');
const router = express.Router();
const {
  addInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor
} = require('../controllers/instructorController');

router.post('/', addInstructor);
router.get('/', getAllInstructors);
router.get('/:id', getInstructorById);
router.put('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);

module.exports = router;
