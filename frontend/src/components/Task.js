import React from "react";

const Task = ({ task, handleUpdate, handleDelete }) => {
  const style = task.status ? "" : "line-through";
  console.log("Task");
  console.log(task);
  return (
    <div className="Task">
      <div className="Task--text">
        <h1 className={style}>{task.name}</h1>
        <span className={style}>{task.description}</span>
      </div>
      <div>
        <button
          className={task.status ? "Task--buttonComplete" : "hide-button"}
          onClick={() => handleUpdate(task)}
        >
          Complete
        </button>
        <button
          className="Task--buttonDelete"
          onClick={() => handleDelete(task)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default Task;
