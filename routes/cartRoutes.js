const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart
} = require('../controllers/cartController');

router.post('/', addToCart);
router.get('/:userId', getCart);
router.put('/:userId', updateCart);
router.delete('/:userId/:id', removeFromCart);

module.exports = router;
