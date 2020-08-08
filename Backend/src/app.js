const express = require("express");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const taskRouter = require("./controllers/tasks");
const bodyParser = require("body-parser");
const requestLogger = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
app.use(requestLogger);
app.use("/tasks", taskRouter);

module.exports = app;
