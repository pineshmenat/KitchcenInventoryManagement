const express = require("express");
const {
  getAllFoods,
  getFood,
  createFood,
  removeFood,
  updateFood,
} = require("../controllers/foodController");

const router = express.Router();

router.route("/").get(getAllFoods).post(createFood);

router.route("/:id").get(getFood).put(updateFood).delete(removeFood);

module.exports = router;
