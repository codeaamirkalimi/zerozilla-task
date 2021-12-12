'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, lowercase: true, trim: true, unique: true },
    phone: { type: String, default: '' },
    totalBill: { type: Number, default: 0 },
    userType: { type: Number, default: 2 },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Client', clientSchema);
