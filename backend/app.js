const express = require('express');
const morgan = require('morgan');
const foodRouter = require('./routes/foodRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const groceryListRouter = require('./routes/groceryRoutes');

const app = express();

// 1. Middlewares
app.use(morgan('dev'));

app.use(express.json());

//2. Routes

app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/groceryLists', groceryListRouter);

module.exports = app;
