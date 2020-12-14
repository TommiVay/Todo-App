const express = require("express");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const taskRouter = require("./controllers/tasks");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const bodyParser = require("body-parser");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/tasks", taskRouter);
app.use("/login", loginRouter);
app.use("/users", userRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/testing", testingRouter);
}

module.exports = app;
