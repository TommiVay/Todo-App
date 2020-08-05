const tasksRouter = require("express").Router();
const Task = require("../models/task");

tasksRouter.get("/", async (request, response) => {
  const tasks = await Task.find({});
  response.json(tasks.map((t) => t.toJSON()));
});

tasksRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const task = {
      name: body.name,
      description: body.description,
      status: body.status,
    };
    const newTask = await task.save();
    response.json(newTask);
  } catch (exception) {
    console.log("asd");
  }
});

module.exports = tasksRouter;
