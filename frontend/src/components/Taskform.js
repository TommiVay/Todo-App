import React from "react";
import { useField } from "../hooks/useField";

const TaskForm = ({ createTask }) => {
  const name = useField("text");
  const description = useField("text");
  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;
  const checkForm =
    name.value === "" ? true : description.value === "" ? true : false;

  const addTask = async (event) => {
    event.preventDefault();
    createTask({
      name: name.value,
      description: description.value,
      status: true,
    });
    name.reset();
    description.reset();
  };

  return (
    <form className="Form" onSubmit={addTask}>
      <div>
        <div>
          <label>Name</label>
          <input {...removeReset(name)} />
        </div>
        <div>
          <label>Description</label>
          <input {...removeReset(description)} />
        </div>
      </div>
      <button
        type="submit"
        disabled={checkForm}
        className={checkForm ? "Form--buttonDisabled" : "Form--buttonActive"}
      >
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
