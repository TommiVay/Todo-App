import React from "react";
import "../index.css";

const TaskForm = ({ name, desc, handleSubmit }) => {
  const removeReset = ({reset, ...rest}) => rest
  const checkForm = name.value === "" ? true : desc.value === "" ? true : false
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Name</label>
          <input {...removeReset(name)} />
        </div>
        <div>
          <label>Description</label>
          <input {...removeReset(desc)} />
        </div>
      </div>
      <button
      type = "submit"
        disabled={checkForm}
        className={checkForm ? "Form--buttonDisabled" : "Form--buttonActive"}
      >
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
