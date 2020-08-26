import React from "react";
/* eslint-disable no-unused-vars */
import { Button } from "react-bootstrap";
/* eslint-enable no-unused-vars */

const Task = ({ task, handleUpdate, handleDelete }) => {
  const style = task.status ? "" : "line-through";
  return (
    <div className="Task">
      <div className="Task--text">
        <h1 className={style}>{task.name}</h1>
        <span className={style}>{task.description}</span>
      </div>
      <div>
        <Button
          className={task.status ? "Task--buttonComplete" : "hide-button"}
          onClick={() => handleUpdate(task)}
        >
          Complete
        </Button>
        <Button
          variant=""
          className="Task--buttonDelete"
          onClick={() => handleDelete(task)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
export default Task;
