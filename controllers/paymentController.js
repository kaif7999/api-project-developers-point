const Payment = require('../models/Payment');

// ➕ Process Payment (Dummy)
exports.processPayment = async (req, res) => {
  const { userId, orderId, amount, paymentMethod } = req.body;

  try {
    // Dummy payment processing
    const paymentStatus = ['completed', 'failed'][Math.floor(Math.random() * 2)];
    const transactionId = paymentStatus === 'completed' ? `TXN${Math.floor(Math.random() * 1000000)}` : null;

    const payment = await Payment.create({
      userId,
      orderId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 Get Payments by User
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    if (!payments) return res.status(404).json({ message: "No payments found" });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
