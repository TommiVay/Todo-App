const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.password === undefined) {
    return response.status(400).json({ error: "password missing" });
  }
  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password too short (min lenght 3) or missing" });
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("tasks", {
    name: 1,
    description: 1,
    status: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
