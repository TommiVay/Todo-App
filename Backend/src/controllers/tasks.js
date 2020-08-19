const tasksRouter = require("express").Router();
const Task = require("../models/task");

tasksRouter.get("/", async (request, response) => {
  const tasks = await Task.find({}).populate("user", { username: 1, _id: 1 });
  response.json(tasks.map((t) => t.toJSON()));
});

tasksRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const task = new Task({
      name: body.name,
      description: body.description,
      status: body.status,
      user: body.user._id,
    });
    const newTask = await task.save();
    response.json(newTask.toJSON());
  } catch (exception) {
    console.log(exception);
  }
});

tasksRouter.put("/:id", async (request, response) => {
  try {
    await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    const tasks = await Task.find({});
    response.json(tasks.map((t) => t.toJSON()));
  } catch (exception) {
    console.log(exception);
  }
});

tasksRouter.delete("/:id", async (request, response) => {
  try {
    console.log(request.params.id);
    await Task.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    console.log(exception);
  }
});

module.exports = tasksRouter;
