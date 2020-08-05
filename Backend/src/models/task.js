const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    description: {
      type: String,
      requred: true,
    },
    status: {
      type: Boolean,
      requred: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
