const { Food } = require('../models/Food');

// 2. controllers

// exports.checkId = function checkId(req, res, next, val) {
//   console.log(`Id is ${val}`);
//   const name = req.params.id;
//   const foodIndex = foods.findIndex(food => food.name === name);
//   if (foodIndex === -1)
//     return res.status(400).json({
//       status: 'error',
//       message: 'Invalid Id'
//     });
//   next();
// };

exports.checkBody = function checkBody(req, res, next) {
  if (req.method === 'GET') next();
  const { body } = req;
  console.log(body);
  if (body.name && body.price) next();
  else
    return res.status(400).json({
      status: 'error',
      message: 'Invalid req body'
    });
};

exports.getAllFoods = async function getAllFoods(req, res) {
  try {
    const foods = await Food.find();
    res.status(200).json({
      status: 'success',
      count: foods.length,
      data: { foods }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.getFood = async function getFood(req, res) {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      count: food.length,
      data: { food }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.createFood = async function createFood(req, res) {
  try {
    const food = new Food(req.body);

    const result = await food.save();

    res.status(201).json({
      status: 'success',
      data: { result }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.updateFood = async function updateFood(req, res) {
  // https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new doc will be returned
      runValidators: true // run schema validations again
    });
    res.status(200).json({
      status: 'success',
      data: { food }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.removeFood = async function removeFood(req, res) {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: { food }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};
