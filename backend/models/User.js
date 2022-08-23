const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //Blueprint
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 4,
    maxLength: 100,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 8,
    maxLength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema); // Class

module.exports = { UserSchema, User };

/**
 * We have following schema types
 * String
 * Number
 * Date
 * Buffer - to store binary data
 * Boolean
 * ObjectID
 * Array
 */

//Schemas are like classes and Models are like instance of those classes
