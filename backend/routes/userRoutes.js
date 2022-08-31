const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  checkBody
} = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(checkBody, createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(removeUser);

module.exports = router;
