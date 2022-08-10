const express = require("express");
const morgan = require("morgan");
const app = express();
const foodRouter = require("./routes/foodRoutes");

// 1. Middlewares
app.use(morgan("dev"));

app.use(express.json());

//2. Routes

app.use("/api/v1/foods", foodRouter);

module.exports = app;
