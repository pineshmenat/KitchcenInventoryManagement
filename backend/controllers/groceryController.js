const { Grocery } = require('../models/Grocery');
const APIFeatures = require('../utils/apiFeatures');

exports.checkBody = function checkBody(req, res, next) {
  if (req.method === 'GET') next();
  const { body } = req;
  if (body.title && body.items) next();
  else
    return res.status(400).json({
      status: 'error',
      message: 'Invalid req body'
    });
};

exports.getAllGroceryLists = async function getAllGroceryLists(req, res) {
  try {
    const features = new APIFeatures(Grocery.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //Execute Query by await-ing it
    const groceries = await features.query;

    res.status(200).json({
      status: 'success',
      count: groceries.length,
      data: { groceries }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err: err.message ? err.message : err }
    });
  }
};

exports.getGroceryList = async function getGroceryList(req, res) {
  try {
    //Projecting fields
    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    const grocery = await Grocery.findById(req.params.id, fields);
    res.status(200).json({
      status: 'success',
      count: grocery.length,
      data: { grocery }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.createGroceryList = async function createGroceryList(req, res) {
  try {
    const grocery = new Grocery(req.body);
    const result = await grocery.save();

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

exports.updateGroceryList = async function updateGroceryList(req, res) {
  // https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate
  try {
    const grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new doc will be returned
      runValidators: true // run schema validations again
    });
    res.status(200).json({
      status: 'success',
      data: { grocery }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.removeGroceryList = async function removeGroceryList(req, res) {
  try {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: { grocery }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};
