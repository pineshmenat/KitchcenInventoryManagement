const mongoose = require("mongoose");
const { CategorySchema } = require("./Category");
const { UserSchema } = require("./User");

const GroceryFoodSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    max: 999,
    default: 1,
  },
  unit: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["gm", "gms", "kg", "kgs", "liter", "liters", "count"],
  },
});

const GrocerySchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    required: true,
    unique: true,
  },
  items: {
    type: [GroceryFoodSchema],
    required: true,
  },
  createdBy: {
    type: UserSchema,
  },
  createdOn: { type: Date, default: Date.now },
});

const Grocery = mongoose.model("Grocery", GrocerySchema);

module.exports = {
  GrocerySchema,
  Grocery,
};
