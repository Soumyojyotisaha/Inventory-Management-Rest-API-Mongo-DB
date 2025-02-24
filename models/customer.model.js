const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 🔐 Password Reset Fields
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },

  // 🔑 Two-Factor Authentication (2FA) Fields
  twoFactorEnabled: { type: Boolean, default: false }, // ✅ Tracks 2FA status
  twoFactorSecret: { type: String }, // ✅ Optional for Google Authenticator (TOTP)
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
