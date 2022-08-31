const express = require('express');
const {
  getAllGroceryLists,
  getGroceryList,
  createGroceryList,
  updateGroceryList,
  removeGroceryList,
  checkBody
} = require('../controllers/groceryController');

const router = express.Router();

router
  .route('/')
  .get(getAllGroceryLists)
  .post(checkBody, createGroceryList);

router
  .route('/:id')
  .get(getGroceryList)
  .patch(updateGroceryList)
  .delete(removeGroceryList);

module.exports = router;
