const fs = require("fs");
const path = require("path");

const foods = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../foods.json"), { encoding: "utf-8" })
);

// 2. controllers

exports.getAllFoods = function getAllFoods(req, res) {
  res.status(200).json({
    status: "success",
    count: foods.length,
    data: { foods },
  });
};

exports.getFood = function getFood(req, res) {
  const name = req.params.id;
  let food = foods.find((food) => food.name === name);
  if (!food)
    res.status(400).json({
      status: "error",
      message: "Invalid Id",
    });
  res.status(200).json({
    status: "success",
    count: food.length,
    data: { food },
  });
};

exports.createFood = function createFood(req, res) {
  //validate req body
  //if invallid send 400 Bad request else add to DB and send same obj back
  console.log(__dirname);
  foods.push(req.body);
  fs.writeFile(
    path.join(__dirname, "../foods.json"),
    JSON.stringify(foods),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Failed to save to DB",
        });
      }
      res.status(201).json({
        status: "success",
        data: { food: req.body },
      });
    }
  );
};

exports.updateFood = function updateFood(req, res) {
  //validate req body
  //if invallid send 400 Bad request else add to DB and send same obj back
  const name = req.params.id;
  const foodIndex = foods.findIndex((food) => food.name === name);
  if (foodIndex === -1)
    res.status(400).json({
      status: "error",
      message: "Invalid Id",
    });
  const updatedFoodObj = Object.assign(foods[foodIndex], req.body);
  // foods.splice(foodIndex, 1 , updatedFoodObj);
  const updatedfoods = [
    ...foods.slice(0, foodIndex - 1),
    updatedFoodObj,
    ...foods.slice(foodIndex + 1),
  ];
  fs.writeFile(
    path.join(__dirname, "../foods.json"),
    JSON.stringify(updatedfoods),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Failed to save to DB",
        });
      }
      res.status(201).json({
        status: "success",
        data: { food: req.body },
      });
    }
  );
};

exports.removeFood = function removeFood(req, res) {
  //validate req body
  //if invallid send 400 Bad request else add to DB and send same obj back
  const name = req.params.id;
  const foodIndex = foods.findIndex((food) => food.name === name);
  if (foodIndex === -1)
    res.status(400).json({
      status: "error",
      message: "Invalid Id",
    });
  const updatedfoods = [
    ...foods.slice(0, foodIndex),
    ...foods.slice(foodIndex + 1),
  ];
  fs.writeFile(
    path.join(__dirname, "../foods.json"),
    JSON.stringify(updatedfoods),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Failed to save to DB",
        });
      }
      res.status(201).json({
        status: "success",
        data: { name: name },
      });
    }
  );
};
