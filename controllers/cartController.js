const Cart = require('../models/Cart');

// ➕ Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      cart = await cart.save();
    }

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get Cart by User
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Cart
exports.updateCart = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.id);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
