const express = require('express');
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
  checkBody
} = require('../controllers/categoryController');

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post(checkBody, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(removeCategory);

module.exports = router;
