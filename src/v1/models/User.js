'use strict';

// node modules
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, lowercase: true, trim: true, unique: true },
    password: { type: String, min: 8 },
    name: { type: String, default: '' },
    userType: { type: Number, default: 3 },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// do not return password
userSchema.set('toJSON', {
  transform(doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

// on save hook
userSchema.pre('save', function(next) {
  const user = this;
  if (!this.isModified('password')) {
    console.log('password not modified');
    return next();
  }
  console.log('password modified');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
