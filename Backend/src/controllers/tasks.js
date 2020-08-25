const tasksRouter = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

tasksRouter.get("/", async (request, response, next) => {
  try {
    const tasks = await Task.find({}).populate("user", { username: 1, _id: 1 });
    response.json(tasks.map((t) => t.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.get("/my", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id).populate("tasks", {
      name: 1,
      description: 1,
      status: 1,
    });
    const tasks = user.tasks;
    response.json(tasks.map((t) => t.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const task = new Task({
      name: body.name,
      description: body.description,
      status: body.status,
      user: user._id,
    });
    const newTask = await task.save();
    user.tasks = user.tasks.concat(newTask._id);
    await user.save();
    response.json(newTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.put("/:id", async (request, response, next) => {
  try {
    const task = await Task.findById(request.params.id);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (task.user.toString() != decodedToken.id.toString()) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });

    const user = await User.findById(decodedToken.id).populate("tasks", {
      name: 1,
      description: 1,
      status: 1,
    });

    const tasks = user.tasks;

    response.json(tasks.map((t) => t.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.delete("/:id", async (request, response, next) => {
  try {
    const task = await Task.findById(request.params.id);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (task.user.toString() != decodedToken.id.toString()) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    await Task.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = tasksRouter;
