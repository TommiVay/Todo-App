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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
