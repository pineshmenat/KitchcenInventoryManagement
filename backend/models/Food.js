const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
    required: true
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: true
  },
  bestBefore: {
    type: Date,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    min: 0.1,
    max: 9999,
    required: true,
    default: 1
  },
  quantity: {
    type: Number,
    min: 1,
    max: 999,
    required: true,
    default: 1
  },
  unit: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    enum: [
      'gm',
      'gms',
      'kg',
      'kgs',
      'liter',
      'liters',
      'count',
      'lb',
      'lbs',
      'pound',
      'pounds'
    ]
  },
  createdOn: { type: Date, default: Date.now }
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = {
  FoodSchema,
  Food
};
