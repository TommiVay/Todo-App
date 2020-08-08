const tasksRouter = require("express").Router();
const Task = require("../models/task");

tasksRouter.get("/", async (request, response) => {
  const tasks = await Task.find({});
  response.json(tasks.map((t) => t.toJSON()));
});

tasksRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const task = new Task({
      name: body.name,
      description: body.description,
      status: body.status,
    });
    const newTask = await task.save();
    response.json(newTask.toJSON());
  } catch (exception) {
    console.log(exception);
  }
});

tasksRouter.put("/:id", async (request, response) => {
  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    response.json(task.toJSON());
  } catch (exception) {
    console.log(exception);
  }
});

tasksRouter.delete("/:id", async (request, response) => {
  try {
    await Task.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    console.log(exception);
  }
});

module.exports = tasksRouter;
