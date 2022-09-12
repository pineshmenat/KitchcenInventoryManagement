const { Grocery } = require('../models/Grocery');

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
    let query = Grocery.find(JSON.parse(queryStr));

    //Sorting ?sort=price,quantity => "price quantity"
    if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
    else query = query.sort('createdOn');

    //Projecting/ Field limiting fields=name,price,quantity => "name price quantity"
    if (req.query.fields)
      query = query.select(req.query.fields.split(',').join(' '));
    else query = query.select('-__v');

    //Execute Query by await-ing it
    const groceries = await query;

    res.status(200).json({
      status: 'success',
      count: groceries.length,
      data: { groceries }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
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
