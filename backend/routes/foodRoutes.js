const express = require('express');
const {
  getAllFoods,
  getFood,
  createFood,
  removeFood,
  updateFood,
  checkId,
  checkBody
} = require('../controllers/foodController');

const router = express.Router();

/**
 * This param middleware can be used for DRY principal where in we can takeout
 * checkId code from all controller functions and put it in 1 common place
 */
// router.param('id', checkId);

router
  .route('/')
  .get(getAllFoods)
  .post(checkBody, createFood);

router
  .route('/:id')
  .get(getFood)
  .patch(updateFood)
  .delete(removeFood);

module.exports = router;
