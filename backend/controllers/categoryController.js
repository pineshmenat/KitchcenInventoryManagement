const { Category } = require('../models/Category');

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
    //FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    //Advanced FILTERING
    let queryStr = JSON.stringify(queryObj);
    //Regex to match exactly individual op and not something like ABCDlteEF to prevent this we use \b
    //e.g. price[lte]=5 => { price: { lte: '5' } } => { price: { '$lte': '5' } }
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    //Querying
    let query = Category.find(JSON.parse(queryStr));

    //Limiting
    const limit = req.query.limit ? req.query.limit * 1 : 100;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const count = await Category.countDocuments();
      if (skip >= count) throw new Error('Page does not exist');
    }

    //Sorting ?sort=price,quantity => "price quantity"
    if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
    else query = query.sort('createdOn');

    //Projecting/ Field limiting fields=name,price,quantity => "name price quantity"
    if (req.query.fields)
      query = query.select(req.query.fields.split(',').join(' '));
    else query = query.select('-__v');

    //Execute Query by await-ing it
    const categories = await query;
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
