const mongoose = require('mongoose');
const { token } = require('morgan');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  admin: {
    type: Boolean,
    default: false
  },

  token: {
    type: String,
    default: null
  },
  // Optional fields
  // profilePicture: {
  //   type: String,
  //   default: null
  // },
  // bio: {
  //   type: String,
  //   default: null
  // },

  // Timestamps for created and updatedAt fields
  // These fields will automatically be managed by Mongoose
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
