const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPaymentsByUser
} = require('../controllers/paymentController');

router.post('/', processPayment);
router.get('/:userId', getPaymentsByUser);

module.exports = router;
