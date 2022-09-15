const { Category } = require('../models/Category');
const APIFeatures = require('../utils/apiFeatures');

exports.checkBody = function checkBody(req, res, next) {
  if (req.method === 'GET') next();
  const { body } = req;
  if (body.name) next();
  else
    return res.status(400).json({
      status: 'error',
      message: 'Invalid req body'
    });
};

exports.getAllCategories = async function getAllCategories(req, res) {
  try {
    const features = new APIFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //Execute Query by await-ing it
    const categories = await features.query;
    res.status(200).json({
      status: 'success',
      count: categories.length,
      data: { categories }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.getCategory = async function getCategory(req, res) {
  try {
    //Projecting fields
    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    const category = await Category.findById(req.params.id, fields);
    res.status(200).json({
      status: 'success',
      count: category.length,
      data: { category }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err: err.message ? err.message : err }
    });
  }
};

exports.createCategory = async function createCategory(req, res) {
  try {
    const category = new Category(req.body);
    const result = await category.save();

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

exports.updateCategory = async function updateCategory(req, res) {
  // https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new doc will be returned
      runValidators: true // run schema validations again
    });
    res.status(200).json({
      status: 'success',
      data: { category }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.removeCategory = async function removeFood(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: { category }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};
