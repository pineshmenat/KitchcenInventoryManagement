const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = {
  CategorySchema,
  Category,
};
