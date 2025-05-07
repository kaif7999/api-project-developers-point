const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/:userId', getOrdersByUser);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
