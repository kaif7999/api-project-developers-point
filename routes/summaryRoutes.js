const express = require('express');
const router = express.Router();
const { getInstituteSummary } = require('../controllers/summaryController');

router.get('/', getInstituteSummary);

module.exports = router;
