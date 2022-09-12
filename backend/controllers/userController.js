const { User } = require('../models/User');

exports.checkBody = function checkBody(req, res, next) {
  if (req.method === 'GET') next();
  const { body } = req;
  if (
    body.firstName &&
    body.lastName &&
    body.email &&
    body.password &&
    body.isAdmin
  )
    next();
  else
    return res.status(400).json({
      status: 'error',
      message: 'Invalid req body'
    });
};

exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      count: users.length,
      data: { users }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.getUser = async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      count: user.length,
      data: { user }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.createUser = async function createUser(req, res) {
  try {
    const user = new User(req.body);
    const result = await user.save();
    delete result.password;

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

exports.updateUser = async function updateUser(req, res) {
  // https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new doc will be returned
      runValidators: true // run schema validations again
    });
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};

exports.removeUser = async function removeUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: { err }
    });
  }
};
