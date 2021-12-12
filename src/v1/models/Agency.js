'use strict';

// node modules
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const agencySchema = new Schema(
  {
    name: { type: String, default: '' },
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    phone: { type: String, default: ''},
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    userType: { type: Number, default: 1 },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Agency', agencySchema);
