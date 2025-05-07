// models/Lead.js
const mongoose = require('mongoose');

// Lead schema define
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Lead ka naam (required)
  email: { type: String, required: true }, // Lead ka email (required)
  phone: { type: String, required: true }, // Lead ka phone number (required)
  createdAt: { type: Date, default: Date.now }  // Lead ka creation date
});

// Lead model 
const Lead = mongoose.model('Lead', leadSchema);

// Model ko export
module.exports = Lead;
